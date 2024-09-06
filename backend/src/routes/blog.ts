import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "medium-common-app";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
      },
      Variables: {
        prisma: any,
        userId: any,
      }
}>();

blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
      if (!jwt) {
          c.status(401);
          return c.json({ error: "unauthorized" });
      }
      const token = jwt.split(' ')[1];
      const payload = await verify(token, c.env.JWT_SECRET);
      if (!payload) {
          c.status(401);
          return c.json({ error: "unauthorized" });
      }
      c.set('userId', payload.id);
      await next()
  })


blogRouter.post('/create', async(c) => {
    const prisma = c.get("prisma")
    const body = await c.req.json()
    const userId = c.get("userId")
    const {success} = createBlogInput.safeParse(body)

    if(!success) {
        c.status(403)
        return c.json({message: "wrong data"})
    }

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        
        c.status(200)
        return c.json({
            message: "blog created successfully",
            id: blog.id
        })

    } catch (error) {
        c.status(400)
        return c.json({
            message: "blog not created!",
        })   
    }
  })
  
blogRouter.put('/update', async(c) => {
    const prisma = c.get("prisma")
    const body = await c.req.json()
    const {success} = updateBlogInput.safeParse(body)

    if(!success) {
        c.status(403)
        return c.json({message: "wrong data"})
    }

    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })    

        c.status(200)
        return c.json({
            message: "blog updated successfully"
        })

    } catch (error) {
        c.status(400)
        return c.json({
            message: "blog not updated!",
        })
    }
  })
  
  
  blogRouter.get('/bulk', async(c) => {
      const prisma = c.get("prisma")
      const blogs = await prisma.post.findMany({
        select: {
            title: true,
            content: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
      })
      c.status(200)
      return c.json({
          blogs
      })
  })


  blogRouter.get('/:id', async(c) => {
    const prisma = c.get("prisma")
    const blogId = c.req.param("id")

    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: blogId
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })
        
        if(blog === null) throw "blog not found"
        c.status(200)
        return c.json({
            message: "blog found",
            blog: blog
        })
    } catch (error) {
        c.status(400)
        return c.json({
            message: "blog not found"
        })      
    }
})
