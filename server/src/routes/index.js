import authRouter from "./auth.js"
import categoryRouter from './category.js'
import postRouter from './post.js'
import insertRoute from './data-insert.js';
import userRouter from './user.js'
import paymentRouter from './payment.js'

const initRoutes = (app) => {

    app.use('/api/v1/auth', authRouter)

    // Data inserted into renhousebk_db2, don't trigger this route to prevent data duplication
    // app.use('/api/v1/insert', insertRoute)

    // Deprecated
    // app.use('/api/v1/category', categoryRouter)

    app.use('/api/v1/post', postRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/payment', paymentRouter)



    return app.use('/', (req, res) => {
        res.send('Server is runnning')
    })
}

export default initRoutes