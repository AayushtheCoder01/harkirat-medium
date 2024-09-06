import { Link } from "react-router-dom"

interface BlogCardProps {
  authorName: string,
  title: string,
  blogId: string,
  content: string,
  publishedDate: string
} 

export const BlogCard = ({
  authorName,
  blogId,
  title,
  content,
  publishedDate
} : BlogCardProps) => {
  return (
    <Link to={`/blog/${blogId}`}>
    <div className="p-4 border-b pb-4 border-slate-200 w-screen max-w-screen-lg cursor-pointer">
      <div className="flex">
          <div className="pl-1">
            <Avatar name="harkirat"/>
          </div>
          <div className="flex justify-center flex-col font-light pl-2 text-sm">
             {authorName} •
          </div>
          <div className="flex justify-center flex-col pl-2 font-thin text-sm text-slate-600"> 
            {publishedDate}
          </div>
      </div>

      <div className="text-xl pt-2 font-semibold">
        {title}
      </div>

      <div className="text-md font-thin">
        {content.slice(0, 100) + "..."}
      </div>

      <div className="pt-4 text-slate-500 text-sm font-thin">
        {`${Math.ceil(content.length / 100)} minute(s)`}
      </div>

    </div>
  </Link>
  )
}


export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
  return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
  <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
      {name[0]}
  </span>
</div>
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500">

  </div>
}