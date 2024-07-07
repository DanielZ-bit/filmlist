const { getAllFilms, postFilms, deleteFilms,updateFilms, getFilm} = require('../controllers/films');
const express = require('express');
router = express.Router();

router.route('/').get(getAllFilms).post(postFilms)
router.route('/:id').get(getFilm).delete(deleteFilms).patch(updateFilms)
module.exports = router;

