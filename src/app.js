import express, { application } from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewProds from "./routes/viewProds.router.js"
import viewCart from "./routes/viewCart.router.js"
import handlebars from "express-handlebars"
import {__dirname} from "./utils.js"
import "./dao/mongoManagers/dbConfig.js"
import { Server } from "socket.io"
import cookieParser from "cookie-parser"
import session from "express-session"
import viewsRouter from "./routes/views.router.js"
import usersRouter from "./routes/users.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import mongoStore from "connect-mongo"
import passport from "passport"
import "./passport/passportStrategies.js"
import config from "./config.js"

const app = express() 
const PORT = config.PORT

/* 
const cartManager = new CartManager */

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))

/* configuro cookieParser, session con mongo session*/
app.use(cookieParser()) 
app.use(
    session({
      secret: 'sessionKey',
      resave: false,
      saveUninitialized: true,
      store: new mongoStore({
        mongoUrl: config.MONGOURL
      }),
    })
  )

/* passport */
app.use(passport.initialize())
app.use(passport.session())

/* redirect login */
app.get("/", (req,res)=>{
  res.redirect("/views")
})

/*  seteo handlebars*/
app.engine('handlebars',handlebars.engine())
app.set('view engine','handlebars')
app.set('views',__dirname+'/views')

/* http server */
const httpServer = app.listen(PORT, () => {
    console.log(`Server OK en puerto ${PORT}`)
})

/* const socketServer = new Server(httpServer);
socketServer.on("connection",(socket)=>{
    console.log(`Usuario conectado: ${socket.id}`)
    socket.on("prodToCart", async prod => {
        const addProd = await cartManager.addProductToCart("6407886118c23af73d1197dc", prod.id)
        return addProd
    })
}) */

/* views */
app.use("/products/", viewProds)
app.use("/carts", viewCart)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/users", usersRouter)
app.use("/views", viewsRouter)
app.use("/api/sessions", sessionsRouter)