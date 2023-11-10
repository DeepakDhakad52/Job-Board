const express = require('express')
const { UserModel } = require('../Models/User.model')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


const UserRoute = express.Router()

UserRoute.get('/', async (req, res) => {
    const data = await UserModel.find()
    res.send(data)
    console.log('welcome')
})

UserRoute.get('/:_id', async (req, res) => {
    const { _id } = req.params; // Use req.params to access route parameters
    try {
        const data = await UserModel.findById(_id);
        if (!data) {
            // Handle the case where the document with the given _id is not found
            return res.status(404).json({ error: 'Document not found' });
        }
        res.send(data);
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


UserRoute.post('/register', async (req, res) => {
    const { name, email, password, role, mobile } = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            res.send({ "msg": "Already have an account please login" })
        } else {
            bcrypt.hash(password, 9, async (err, hash) => {
                if (err) {
                    res.send("Something went wrong")
                } else {
                    const user = new UserModel({ name, email, password: hash, role, mobile })
                    await user.save()
                    res.send({ "msg": "new user has been register", "success": true })
                }
            });
        }
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Can't register", "success": false })
    }
})

UserRoute.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "caloriecalculator")
                    res.send({ "msg": "Login sucessful", "success": true, token, user })
                } else {
                    res.send({ "msg": "Wrong crediential", "success": false })
                }
            });
        } else {
            res.send({ "msg": "Wrong crediential", "success": false })
        }
    } catch (err) {
        res.send({ "msg": "Something Wrong", "success": false })
    }
})

module.exports = {
    UserRoute
}