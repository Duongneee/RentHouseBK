import authRouter from "./auth"

import insertRoute from './data-insert';

const initRoutes = (app) => {

    app.use('/api/v1/auth', authRouter) 
    app.use('/api/v1/data-insert', insertRoute) 

    return app.use('/', (req, res) => {
        res.send('Server is runnning')
    })
}

export default initRoutes