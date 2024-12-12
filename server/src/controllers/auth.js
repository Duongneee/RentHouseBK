import * as authService from "../services/auth"

export const register = async (req, res) => {
    const { name, phone, password } = req.body
    try {
        if (!name || !phone || !password) return res.status(400).json({
            err: 1, // LỖI CLIENT
            msg: 'Missing Input !!'
        })
        const response = await authService.registerService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1, // LỖI SERVER 
            msg: `Fail at auth controller: ${error.message}`
        })
    }
}

export const login = async (req, res) => {
    const { phone, password } = req.body;
    try {
        if (!phone || !password) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing Input !!'
            });
        }

        console.log('Login input:', { phone, password }); 

        const response = await authService.loginService(phone, password);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: `Fail at auth controller: ${error.message}`
        });
    }
};
