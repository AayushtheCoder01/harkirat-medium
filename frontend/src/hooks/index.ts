import axios from "axios"
import { useEffect, useState } from "react"

type BlogTypes = {
    title: string,
    content: string,
    id: string,
    author: {
      name: string
    }
  }
export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<BlogTypes[]>([])
    const backend_url = import.meta.env.VITE_BACKEND_URL
    useEffect(() => {
        axios.get(`${backend_url}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setBlogs(response.data.blogs)
            setLoading(false)
        })
    }, [])

    return{
        loading,
        blogs
    }
}

export type Blog = {
    title: string,
    content: string,
    id: string,
    author: {
      name: string,
      email: string
    }
  }
export const useBlog = ({blogId} : {blogId: string}) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>()
    const backend_url = import.meta.env.VITE_BACKEND_URL
    useEffect(() => {
        axios.get(`${backend_url}/api/v1/blog/${blogId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setBlog(response.data.blog)
            setLoading(false)
        })
    }, [])

    return{
        loading,
        blog
    }
}