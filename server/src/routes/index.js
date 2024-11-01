import authRouter from "./auth"
import categoryRouter from './category'

import insertRouter from './data-insert';

const initRoutes = (app) => {

    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/data-insert', insertRouter)
    app.use('/api/v1/category', categoryRouter)

    return app.use('/', (req, res) => {
        res.send('Server is runnning')
    })
}

export default initRoutes