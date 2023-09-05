const CustomAPIError = require("../errors/custom-error")
const jwt = require('jsonwebtoken')

const auth = async (req,res,next)=>{
    let token = req.headers.authorization
    if (!token || !token.startsWith('Bearer'))
    {
        throw new CustomAPIError('No token provided',401)
    }
    token = token.split(' ')[1]
    try
    {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {...decoded}
        next()

    }
    catch(err)
    {
        throw new CustomAPIError('Not authorized',401)
    }
}
module.exports = auth