const CustomAPIError = require("../errors/custom-error")
const jwt = require('jsonwebtoken')
const login = (req,res)=>{
    const {username, password} = req.body
    if (!username || !password)
    {
        throw new CustomAPIError('Please provide password and username',400)
    }
    const id = new Date().getDate()
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.status(200).send({msg:'User Created',token})
}

const dashboard = (req,res)=>{
        const decoded = req.user
        const num = Math.floor(Math.random()*100)
        res.status(200).json({msg:'Hello '+decoded.username,secret:num})
}

module.exports = {login,dashboard}