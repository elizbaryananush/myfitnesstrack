const express = require('express')
const Painting = require('./models/PaintingModel')
const cors = require('cors')
const app = express()
const compression = require('compression')
const { default: mongoose } = require('mongoose')

app.use(compression())
app.use(express.json())
app.use(cors(
    {
        origin: ["https://deploy-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

app.listen(8000, () => {
    console.log('Server listen to port 8000 ...')
})

// mongoose.connect('mongodb://localhost:27017/full_stack')
mongoose.connect('mongodb+srv://test:wwwwww@cluster.ys0ibxc.mongodb.net/?retryWrites=true&w=majority')

app.post('/api/workouts', async (req, res) => {
    try {
        await Painting.create({
            link: req.body.link,
            name: req.body.name,
            genre: req.body.genre,
        })

        return res.json({ status: 'ok' })
    } catch (err) {

        console.log(err)

        return res.json({ status: 'ok', massage: err })
    }
})

app.get('/api/getWorkouts', async (req, res) => {
    const painting = await Painting.find({})

    res.status(200).send(painting);
})

app.post('/api/getItem', async (req, res) => {

    try {

        const Item = await Painting.findOne({ _id: req.body.id.id })

        res.send(Item)
    } catch (err) {
        console.log(req.body);
        res.status(400)
        res.send({ massage: req.body, status: '400' })
    }
})

app.post('/api/like', async (req, res) => {
    try {
        const post = await Painting.findOne({ _id: req.body.id });

        if (post) {
            post.liked = !post.liked;

            await post.save();
            res.status(200).send({ message: post.liked });
        } else {
            res.status(404).send({ message: 'Post not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.get('/api/liked', async (req, res) => {
    try {
        const post = await Painting.find({ liked: true })

        if (post) {
            res.status(200).send(post)
        } else {
            res.status(404).send({ massage: 'not found' })
        }
    } catch (err) {
        res.status(400).send({ massage: err })
    }
})

app.get('/' , (req , res) => {
    res.json('hello')
})