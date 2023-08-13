const jwt = require('jsonwebtoken')
const Customer = require('../models/customer')

const cauth = async(req, res, next) => {
    
    try {

        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY ? process.env.JWT_KEY : "ABCDEF")
        const customer = await Customer.findOne({where:{ id:data.id, 'token': token }})

        if (!customer) {
            throw new Error()
        }
        customer.tokens = [];
        customer.tokens.push(token);
        req.customer = customer
        req.token = token
        next()

    } catch (error) {
        console.error(error);
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}

module.exports = cauth
