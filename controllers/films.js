const Film = require('../models/schema')
const asyncWrapper = require('../middleware/async');

getAllFilms = asyncWrapper( async (req, res) => {
    const films = await Film.find({});
    res.status(200).json({ films, hits: films.length });  
})

postFilms = asyncWrapper( async (req, res) => {
    const films = await Film.create(req.body);
    res.status(201).json({ films });
})

getFilm = asyncWrapper(async (req, res) => {
    const { id: filmID } = req.params;
    const film = await Film.findOne({_id: filmID});
    if (!film) {
        res.status(404).json({ msg: `no film with ID ${filmID}` })
    }
    res.status(200).json({ film })
})

deleteFilms = asyncWrapper( async (req, res) => {
    const { id: filmID } = req.params;
    const films = await Film.findOneAndDelete({ _id: filmID })
    if (!films) {
        res.status(404).json({ msg: `no film with ID ${filmID}` })
    }
    res.status(200).json({films})
})

updateFilms = asyncWrapper(async (req, res) => {
    const { id: filmID } = req.params;
    const films = await Film.findOneAndUpdate({ _id: filmID }, req.body, { new: true, runValidators:true })
    if (!films) {
        res.status(404).json({ msg: `no film with ID ${filmID}` })
    }
    res.status(200).json({films})
})


module.exports = { getAllFilms, postFilms, getFilm, deleteFilms, updateFilms }