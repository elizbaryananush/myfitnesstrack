const express = require('express')
const cors = require('cors')
const User = require('./models/UserModel')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const { default: mongoose } = require('mongoose')
const secret = 'iiiif you got a girlfriend ,  im jelause of her , but if youre single , thats honestly worse , cause youre so gorgeous its actually hurts(honey , it hurts)'

const app = express()
app.use(compression())
app.use(express.json())
app.use(cors(
    {
        origin: ["https://deploy-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(cookieParser())

mongoose.connect('mongodb+srv://test:$2b$10$A78iRDTJ3RK/dGcSUZELJ.E6iSqSmKqrCOBbVsqXzxbNKJsFJAVFu@cluster.ys0ibxc.mongodb.net/?retryWrites=true&w=majority')

app.listen(2800, () => {
    console.log('Server started on port 2800...');
})

app.post('/api/register', async (req, res) => {

    try {
        await User.create({
            username: req.body.username,
            fullname: req.body.fullname, 
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            goal: req.body.goal,
            height: req.body.height,
            age: req.body.age
        })
        return res.json({ status: 'ok' })
    } catch (err) {
        console.log(err);
        return res.json({ status: 'error', error: err })
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (user) {

        const status = bcrypt.compareSync(req.body.password, user.password)
        if (status) {

            jwt.sign({ username: req.body.username, id: user._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json('ok')
            })
        } else {
            res.status(400).json('wrong credentials')
        }
    } else {
        res.status(400).json('no matching account')
    }
})

app.get('/api/profile', (req, res) => {
    const { token } = req.cookies; 

    if (token && token !== '') {
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
            const user = await User.findOne({ username: info.username })
            res.json(user)
        })
    } else {
        res.json('hello')
    }
})

app.post('/api/info', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (req.body.height) {
        try {
            user.charts.height = user.charts.height.concat(req.body.height)
            const updatedUser = await user.save()
            // res.json(req.body)
            console.log(req.body);
            res.json(user)
        } catch (err) {
            res.json(err)
        }
    } else if (req.body.weight) {
        try {
            user.charts.weight = user.charts.weight.concat(req.body.weight)
            const updatedUser = await user.save()
            // res.json(req.body)
            console.log(req.body);
            res.json(user)
        } catch (err) {
            res.json(err)
        } 
    } else {
        res.json(user)
    }

})

app.post('/logout' , (req,res) => {
    res.cookie('token' , '' ).json('ok')
})

app.get('/' , (req , res) => {
    res.json('hello')
})