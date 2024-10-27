import authRouter from "./auth"
import postRouter from "./post"

const initRoutes = (app) => {

    app.use('/api/v1/auth', authRouter) 
    app.use('/api/v1/posts', postRouter)

    return app.use('/', (req, res) => {
        res.send('Server on ... ')
    })
}

export default initRoutes