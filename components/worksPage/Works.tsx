import { useQuery } from "@apollo/client"
import { useMemo, useState, useEffect, useRef } from "react"
import Title from "../Title"
import Work from "./Work"
import workOperations from "../../graphqlOperations/work"
import { WorksConnectionData } from "../../types"
import WorksSkeleton from "./WorksSkeleton"
import { currentWorkTab } from "../../apollo-client"
import { useReactiveVar } from "@apollo/client"
import InfiniteScroll from "react-infinite-scroll-component"
import Loader from "../Loader"
import { motion, AnimatePresence } from "framer-motion"
import Script from "next/script"
import ReactDOM from "react-dom"
import galleryOperations from "../../graphqlOperations/gallery"
import { Masonry, CellMeasurer, CellMeasurerCache, createMasonryCellPositioner } from 'react-virtualized'
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface WorksQuery {
  worksConnection: WorksConnectionData
}

interface WorksVariables {
  after?: string
  first: number
}

export default function Works() {
  // Hooks React en tout début
  const currentTab = useReactiveVar(currentWorkTab)
  const [isOpen, setIsOpen] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const cache = useRef(new CellMeasurerCache({
    defaultHeight: 250,
    defaultWidth: 300,
    fixedWidth: true,
  })).current;
  const columnWidth = 140;
  const gutterSize = 16;
  const masonryRef = useRef<any>(null);
  const [masonryWidth, setMasonryWidth] = useState(1200);
  const cellPositioner = useRef<any>();
  // Liste d’images pour la galerie et les carrousels
  const galleryImages = [
    "/images/avocado.jpg",
    "/images/pic4.png",
    "/images/g-7.jpg",
    "/images/kline.PNG",
    "/images/kline1.PNG",
    "/images/logo1.jpg",
    "/images/p-2.jpg",
    "/images/martin.jpg",
    "/images/g-9.jpg",
    "/images/lin.png",
    "/images/upwork.png",
    "/images/upw.png",
    "/images/freelancer.png",
    "/images/envato.png",
    "/images/Frame 44.png"
  ]
  // Animation utilitaire pour motion
  const fadeIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  }
  // Gestion du modal d’image
  const openModal = (idx: number) => { setModalIndex(idx); setModalOpen(true) }
  const closeModal = () => setModalOpen(false)
  // Swiper modal init/destroy via useEffect (déplacé ici)
  useEffect(() => {
    if (modalOpen && typeof window !== 'undefined') {
      const init = () => {
        if ((window as any).Swiper && document.querySelector('.swiper-modal')) {
          if((window as any).modalSwiper) { (window as any).modalSwiper.destroy(); (window as any).modalSwiper = null; }
          (window as any).modalSwiper = new (window as any).Swiper('.swiper-modal', {
            initialSlide: modalIndex,
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            pagination: { el: '.swiper-pagination', clickable: true },
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            effect: 'coverflow',
            coverflowEffect: {
              rotate: 70,
              stretch: 0,
              depth: 400,
              modifier: 2,
              slideShadows: true,
            },
          });
        }
      }
      // Swiper peut être chargé asynchrone, donc on poll jusqu'à ce qu'il soit prêt
      let tries = 0;
      const poll = () => {
        if ((window as any).Swiper && document.querySelector('.swiper-modal')) {
          init();
        } else if (tries < 20) {
          tries++;
          setTimeout(poll, 50);
        }
      }
      poll();
      return () => {
        if((window as any).modalSwiper) { (window as any).modalSwiper.destroy(); (window as any).modalSwiper = null; }
      }
    }
  }, [modalOpen, modalIndex])
  // Supprimer tout ce qui concerne isTransitioning, setIsTransitioning, pendingIndex, setPendingIndex, canvasRef, et les anciens handlers liés à l'effet particule.
  const {
    data: worksData,
    error: worksError,
    fetchMore,
  } = useQuery<WorksQuery, WorksVariables>(workOperations.Queries.getWorks, {
    variables: { first: 6 },
  })
  const filteredWorks = useMemo(() => {
    if (worksData === undefined) return
    return worksData.worksConnection.edges.filter((w) =>
      w.node.workTabs.some((t) => t.tab === currentTab)
    )
  }, [worksData, currentTab])
  // Pagination Hygraph
  const { data: galleryData, loading: galleryLoading, error: galleryError, fetchMore: fetchMoreGallery } = useQuery(galleryOperations.Queries.getGalleryImages, {
    variables: { first: 10 },
  });
  const galleryEdges = galleryData?.galleryImagesConnection?.edges || [];
  const galleryImagesData = galleryEdges.map((e: any) => e.node);
  const pageInfo = galleryData?.galleryImagesConnection?.pageInfo;
  // Crée un tableau de toutes les images de toutes les entrées
  const allGalleryImages = galleryImagesData.flatMap((img: any) =>
    (img.images || []).map((asset: any) => ({
      id: img.id + '-' + asset.url,
      url: asset.url,
      titre: img.titre,
      description: img.description,
    }))
  );
  // Masonry responsive : nombre de colonnes dynamique (min 2, max selon largeur)
  const getColumnCount = (width: number) => Math.max(3, Math.floor(width / (columnWidth + gutterSize)));
  useEffect(() => {
    cellPositioner.current = createMasonryCellPositioner({
      cellMeasurerCache: cache,
      columnCount: getColumnCount(masonryWidth),
      columnWidth,
      spacer: gutterSize,
    });
    if (masonryRef.current) {
      masonryRef.current.clearCellPositions();
    }
  }, [masonryWidth, cache, allGalleryImages.length]);
  if (worksError) {
    console.log(worksError.toString())
    return <WorksSkeleton />
  }
  if (worksData === undefined) return <WorksSkeleton />
  if (galleryLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader />
      </div>
    );
  }

  // Ajout virtualized Masonry
  const cellRenderer = ({ index, key, parent, style }: any) => (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={key}
      parent={parent}
      rowIndex={index}
    >
      <div style={{ ...style, padding: 6, maxWidth: 140, margin: '0 auto' }}>
        <motion.div
          className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl bg-gray-900"
          onClick={() => openModal(index)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <img
            src={allGalleryImages[index].url}
            alt={allGalleryImages[index].titre || `galerie-${index}`}
            className="object-cover w-full h-auto mx-auto"
            style={{ width: '100%', height: 'auto' }}
          />
          <div className="absolute inset-0 rounded-xl flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(180deg, #ff9f22cc 0%, #ff9f2200 80%)' }}
          >
            <span className="text-white text-xl font-bold mb-4 drop-shadow">{allGalleryImages[index].titre || "Voir"}</span>
          </div>
        </motion.div>
      </div>
    </CellMeasurer>
  );

  return (
    <>
      {/* Swiper CDN pour la galerie */}
      <Script
        strategy="afterInteractive"
        src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
      />
      <div
        id="scrollableDiv"
        className="lg:h-full h-[95rem] overflow-y-scroll myScroll"
      >
        <Title name="works" currentMenu={currentTab} />

        <InfiniteScroll
          dataLength={worksData.worksConnection.edges.length}
          next={() => {
            return fetchMore({
              variables: { after: worksData.worksConnection.pageInfo.endCursor },
            })
          }}
          hasMore={worksData.worksConnection.pageInfo.hasNextPage}
          loader={
            <div className="flex justify-center mb-8">
              <Loader />
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          <motion.ul
            layout="position"
            className="grid grid-cols-1 sm:grid-cols-2 relative pt-12"
          >
            <AnimatePresence>
              {filteredWorks &&
                filteredWorks.map((w) => (
                  <Work
                    key={w.node.id}
                    title={w.node.title}
                    imageUrl={w.node.images[0].url}
                    projectId={w.node.id}
                  />
                ))}
            </AnimatePresence>
          </motion.ul>
        </InfiniteScroll>
        {/* Galerie Masonry --> Galerie simple responsive */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#ff9f22]">Galerie photo</h2>
          <InfiniteScroll
            dataLength={allGalleryImages.length}
            next={() => fetchMoreGallery({ variables: { after: pageInfo.endCursor, first: 10 } })}
            hasMore={pageInfo?.hasNextPage}
            loader={
              <div className="flex flex-col items-center justify-center py-8">
                <Loader />
                <span className="mt-2 text-gray-400">Chargement...</span>
              </div>
            }
            scrollableTarget="scrollableDiv"
            endMessage={null}
          >
            {/* Galerie virtualisée avec react-window */}
            <div style={{ width: '100%', height: '80vh', minHeight: 400 }}>
              <AutoSizer>
                {({ width, height }: { width: number; height: number }) => {
                  // Responsive columns
                  const getColumnCount = (w: number) => {
                    if (w < 640) return 1;
                    if (w < 1024) return 2;
                    return 3;
                  };
                  const columnCount = getColumnCount(width);
                  const rowCount = Math.ceil(allGalleryImages.length / columnCount);
                  const cellHeight = 260;
                  return (
                    <Grid
                      columnCount={columnCount}
                      columnWidth={width / columnCount}
                      height={height}
                      rowCount={rowCount}
                      rowHeight={cellHeight}
                      width={width}
                    >
                      {({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
                        const idx = rowIndex * columnCount + columnIndex;
                        if (idx >= allGalleryImages.length) return null;
                        const img = allGalleryImages[idx];
                        return (
                          <div
                            style={style}
                            key={img.id}
                            className="relative cursor-pointer group overflow-hidden rounded-xl bg-gray-900 m-2"
                            onClick={() => openModal(idx)}
                          >
                            <img
                              src={img.url}
                              alt={img.titre || `galerie-${idx}`}
                              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                              style={{ height: '100%', width: '100%' }}
                            />
                            <div className="absolute inset-0 rounded-xl flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ background: 'linear-gradient(180deg, #ff9f22cc 0%, #ff9f2200 80%)' }}
                            >
                              <span className="text-white text-xl font-bold mb-4 drop-shadow">{img.titre || "Voir"}</span>
                            </div>
                          </div>
                        );
                      }}
                    </Grid>
                  );
                }}
              </AutoSizer>
            </div>
          </InfiniteScroll>
          {/* Modal d’image */}
          {modalOpen && (
            <>
              {/* Swiper CDN pour le modal */}
              <Script
                strategy="afterInteractive"
                src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
              />
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
              />
              <div key={modalIndex} className="absolute left-0 top-0 z-[9999] w-full h-full flex items-center justify-center bg-black/80" onClick={closeModal}>
                <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
                  <button className="absolute top-6 right-8 text-white text-4xl rounded-full shadow-lg w-14 h-14 flex items-center justify-center hover:scale-110 transition-transform z-20" style={{ background: 'none', color: '#ff9f22' }} onClick={closeModal}>&times;</button>
                  <div className="swiper-modal h-[80vh] w-full max-w-3xl max-h-[80vh] flex items-center justify-center rounded-xl shadow-lg p-4 bg-black/90">
                    <div className="swiper-wrapper h-full w-full">
                      {allGalleryImages.map((img: any, idx: number) => (
                        <div className="swiper-slide h-full w-full flex items-center justify-center" key={img.id}>
                          <img src={img.url} alt={img.titre || `modal-${idx}`} className="h-full w-full max-h-full max-w-full object-contain mx-auto my-auto block rounded-2xl shadow-2xl transition-all duration-700" />
                        </div>
                      ))}
                    </div>
                    {/* Pagination Swiper limitée à 4 points max */}
                    <div className="swiper-pagination" style={{ maxWidth: '160px', overflow: 'hidden' }}></div>
                    <div className="swiper-button-prev !absolute left-8 !top-1/2 !-translate-y-1/2 z-20 w-16 h-16 flex items-center justify-center text-3xl rounded-full shadow-lg hover:scale-110 transition-transform" style={{ background: 'none', color: '#ff9f22' }}></div>
                    <div className="swiper-button-next !absolute right-8 !top-1/2 !-translate-y-1/2 z-20 w-16 h-16 flex items-center justify-center text-3xl rounded-full shadow-lg hover:scale-110 transition-transform" style={{ background: 'none', color: '#ff9f22' }}></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Initialisation Swiper */}
        <Script id="init-swiper" strategy="afterInteractive">
          {`
            if (window.Swiper) {
              new window.Swiper('.swiper', {
                loop: true,
                pagination: { el: '.swiper-pagination', clickable: true, renderBullet: function (index, className) {
                  if (this.pagination && this.pagination.bullets && this.pagination.bullets.length >= 4 && index >= 4) return '';
                  return '<span class="' + className + '"></span>';
                } },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                slidesPerView: 1,
                spaceBetween: 30,
                autoplay: { delay: 3500, disableOnInteraction: false },
              });
            } else {
              document.addEventListener('DOMContentLoaded', function() {
                if (window.Swiper) {
                  new window.Swiper('.swiper', {
                    loop: true,
                    pagination: { el: '.swiper-pagination', clickable: true, renderBullet: function (index, className) {
                      if (this.pagination && this.pagination.bullets && this.pagination.bullets.length >= 4 && index >= 4) return '';
                      return '<span class="' + className + '"></span>';
                    } },
                    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                    slidesPerView: 1,
                    spaceBetween: 30,
                    autoplay: { delay: 3500, disableOnInteraction: false },
                  });
                }
              });
            }
          `}
        </Script>
      </div>
    </>
  )
}
