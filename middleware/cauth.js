const jwt = require('jsonwebtoken')
const Customer = require('../models/customer')

const cauth = async(req, res, next) => {
    
    try {

        const token = req.header('Authorization').replace('Bearer ', '')
        console.log("token",token);

        const data = jwt.verify(token, process.env.JWT_KEY ? process.env.JWT_KEY : "ABCDEF")
        console.log("data",data);
        const customer = await Customer.findOne({ id:data.id, 'token': token })
        if (!customer) {
            throw new Error()
        }
        req.customer = customer
        req.token = token
        next()

    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}

module.exports = cauth
