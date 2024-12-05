import authRouter from "./auth"
import categoryRouter from './category'
import postRouter from './post'
import insertRoute from './data-insert';
import userRouter from './user'

const initRoutes = (app) => {

    app.use('/api/v1/auth', authRouter)

    // Data inserted into renhousebk_db2, don't trigger this route to prevent data duplication
    // app.use('/api/v1/insert', insertRoute)

    // Deprecated
    // app.use('/api/v1/category', categoryRouter)

    app.use('/api/v1/post', postRouter)
    app.use('/api/v1/user', userRouter)

    return app.use('/', (req, res) => {
        res.send('Server is runnning')
    })
}

export default initRoutes