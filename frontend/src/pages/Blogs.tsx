import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export function Blogs() {

  const {loading, blogs} = useBlogs()

  if(loading) {
    return <div>
    <Appbar /> 
    <div  className="flex justify-center">
        <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>
    </div>
</div>
  }
  return (<div>
    <div>
      <Appbar />
    </div>
  <div className="flex justify-center items-center flex-col">
    {blogs.map((blog) => (
      
    <div className="flex justify-center">
        <BlogCard 
          blogId = {blog.id}
          authorName = {blog.author.name}
          title = {blog.title}
          content = {blog.content}
          publishedDate = "4/09/24"
        />
    </div>
    ))}
  </div> 
  </div>
  )
}
