const express = require('express')

const mongoose = require('mongoose')

const User = require('../models/user')

const jwt = require('jsonwebtoken')

const db = "mongodb://Nikhil28:Qwerty28@ds013260.mlab.com:13260/eventsdb"

const router = express.Router()

mongoose.connect(db, err => {
    if (err) {
        console.error('Error' + err);
    } else {
        console.log('Connnected to mongoDB')
    }
});

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }
  

router.get('/', (req, res) => {
    res.send('From API Route');
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid Email')
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid Password')
                }
                else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
                }
            }
        }
    })
})

router.get('/events', (req, res) => {
    let events = [
        {
            "id": "1",
            "name": "Auto Expo",
            "description": "yo",
            "date": "2/4/18"
        },
        {
            "id": "2",
            "name": "Auto Expo",
            "description": "yo",
            "date": "2/4/18"
        },
        {
            "id": "3",
            "name": "Auto Expo",
            "description": "yo",
            "date": "2/4/18"
        },
        {
            "id": "4",
            "name": "Auto Expo",
            "description": "yo",
            "date": "2/4/18"
        }
    ]

    res.json(events)
})

router.get('/special',verifyToken, (req, res) => {
    let events = [
        {
            "id": "1",
            "name": "Auto Expo",
            "description": "yo",
            "date": "2/4/18"
        },
        {
            "id": "2",
            "name": "Auto Expo",
            "description": "yo",
            "date": "2/4/18"
        },
        {
            "id": "3",
            "name": "Auto Expo",
            "description": "yo",
            "date": "2/4/18"
        },
        {
            "id": "4",
            "name": "Auto Expo",
            "description": "yo",
            "date": "2/4/18"
        }
    ]

    res.json(events)
})



module.exports = router