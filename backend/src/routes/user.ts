import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "medium-common-app";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
      },
      Variables: {
        prisma: any,
      }
}>();
  

userRouter.post('/signup', async (c) => {
    // const prisma = new PrismaClient().$extends(withAccelerate())
    const prisma = c.get("prisma")
  
    const body = await c.req.json();
      const { success } = signupInput.safeParse(body);
      if (!success) {
          c.status(400);
          return c.json({ error: "invalid input" });
      }
      try {
          const user = await prisma.user.create({
              data: {
                  name: body.name || null,
                  email: body.username,
                  password: body.password
              }
          });
          const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
          return c.json({ jwt });
      } catch(e) {
          c.status(403);
          return c.json({ error: "error while signing up" });
      } 
  })
  
  userRouter.post('/signin', async (c) => {
    const prisma = c.get("prisma")
  
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body)
    try {
      if(!success) throw 'wrong input'
      const user = await prisma.user.findUnique({
        where: {
          email: body.username,
          password: body.password,
        }
      });
      
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
        
    } catch (error) {
      c.status(403);
      return c.json({ error: "Incorrect credentials" });
    }
  })