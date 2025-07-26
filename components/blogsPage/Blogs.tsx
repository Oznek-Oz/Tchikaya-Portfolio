import { useQuery } from "@apollo/client"
import Title from "../Title"
import Blog from "./Blog"
import BlogSkeleton from "./BlogSkeleton"
import Pagination from "./Pagination"
import blogOperations from "../../graphqlOperations/blog"
import { BlogsQuery } from "../../types"
import { useEffect, useState } from "react"
import { NetworkStatus } from "@apollo/client"
import { FaRegNewspaper } from "react-icons/fa"

interface BlogsVariables {
  skip: number
  first: number
}

const postsPerPage = 10

export default function Blogs() {
  // const [skip, setSkip] = useState<number>(0)
  // const [filteredBlogs, setFilteredBlogs] = useState<BlogsQuery | undefined>(
  //   undefined
  // )
  // const {
  //   data: blogsData,
  //   error,
  //   fetchMore,
  //   networkStatus,
  // } = useQuery<BlogsQuery, BlogsVariables>(blogOperations.Queries.getBlogs, {
  //   variables: { skip: skip, first: postsPerPage },
  //   notifyOnNetworkStatusChange: true,
  // })
  // const [currentPage, setCurrentPage] = useState<number>(1)

  // if (error) {
  //   console.log(error)
  // }

  // useEffect(() => {
  //   if (blogsData === undefined) return
  //   setFilteredBlogs(blogsData)
  // }, [blogsData])

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
            Revenez bientôt pour découvrir mes derniers articles et partages sur la  tech.
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
        {filteredBlogs === undefined ||
        networkStatus === NetworkStatus.fetchMore
          ? new Array(postsPerPage)
              .fill(0)
              .map((_, idx) => <BlogSkeleton key={idx} />)
          : filteredBlogs.blogs.map((b, idx) => <Blog key={idx} blog={b} />)}
      </ul>

      <div className="px-12 my-12">
        <Pagination
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSkip={setSkip}
          setFilteredBlogs={setFilteredBlogs}
          onLoadMore={fetchMore}
        />
      </div>
      */}
    </section>
  )
}
