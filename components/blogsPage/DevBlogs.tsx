import { useState } from "react"
import { useFetch } from "../../hooks/useFetch"
import { blog } from "../../types"
import Title from "../Title"
import BlogSkeleton from "./BlogSkeleton"
import DevBlog from "./DevBlog"
import DevPagination from "./DevPagination"
import { FaRegNewspaper } from "react-icons/fa"

const postsPerPage = 10

export default function DevBlogs() {
  // const [currentPage, setCurrentPage] = useState<number>(1)
  // const {
  //   data: blogsData,
  //   isLoading,
  //   isError,
  //   reFetch,
  // } = useFetch<blog[]>(
  //   `https://dev.to/api/articles?username=arafat4693&per_page=${postsPerPage}&page=${currentPage}`
  // )

  // if (isError) {
  //   console.log(isError)
  // }

  return (
    <section className="h-full overflow-y-scroll myScroll">
      <Title name="blogs" />
      
      {/* Message stylé pour aucune publication */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-12">
        <div className="text-center">
          <div className="mb-8">
            <FaRegNewspaper className="mx-auto text-8xl text-[#ff9f22] opacity-60" />
          </div>
          <h2 className="text-4xl font-bold text-gray-300 mb-4">
            Aucune publication pour le moment
          </h2>
          <p className="text-xl text-gray-500 max-w-md mx-auto leading-relaxed">
            Revenez bientôt pour découvrir mes derniers articles et partages sur la tech.
          </p>
          <div className="mt-8">
            <div className="inline-block px-6 py-3 bg-[#ff9f22] bg-opacity-10 border border-[#ff9f22] border-opacity-30 rounded-lg">
              <span className="text-[#ff9f22] text-lg font-medium">
                En cours de préparation...
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu commenté
      <ul className="relative grid grid-cols-1 sm:grid-cols-2 sm:before:block before:hidden vCustomLine before:left-1/2 before:-translate-x-1/2">
        {blogsData === undefined || isLoading
          ? new Array(postsPerPage)
              .fill(0)
              .map((_, idx) => <BlogSkeleton key={idx} />)
          : blogsData.map((b, idx) => <DevBlog key={idx} blog={b} />)}
      </ul>

      <div className="px-12 my-12">
        <DevPagination
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onLoadMore={reFetch}
        />
      </div>
      */}
    </section>
  )
}
