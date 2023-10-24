const mongoose = require('mongoose')

const PaintingSchema = mongoose.Schema(
    {
        link: {
            type: String
        },
        name: {
            type: String
        },
        genre: {
            type: String
        },
        liked: {
            type: Boolean
        },
    },
    {
        // collection: 'painting_schema'
        collection: 'fitness_schema'
    }
)

const PaintingModel = mongoose.model('Painting', PaintingSchema)

module.exports = PaintingModel