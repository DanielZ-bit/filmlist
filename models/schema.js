const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        name: {
            type: String,
            required: [true, 'Name Must be Provided']
        },
        year: {
            type: Number,
            required: [true, 'Date Must be Provided']
        },
        runtime: {
            type: Number,
        },
        rating: {
            type: String,
            enum: {
                values: ['U', 'PG', '12', '15', 'X', 'Not Rated']
            },
            default: 'Not Rated'
        },
        ranking: {
            type: Number
        },
        description: {
            type: String,
            default: 'Please Enter a Description'
        },
        director: {
            type: String,
            required: [true, 'Director Must be Provided']
        },
        actors: {
            type: String
        }
    }
)
module.exports = mongoose.model('Films', FilmSchema)