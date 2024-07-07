import PropTypes from 'prop-types';
import {  useState } from 'react';
import './App.css';
import axios from 'axios';

const postFilm = async (film) => {
    try {
        
        let res = await axios.post("http://localhost:4444/api/v1/list/films", film, { headers: { 'Content-Type': 'application/json' } });
        return res.film;
        
        
    }
    catch (err) {
        console.log(err)
    }
}


function FilmForm({filmData }) {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [runtime, setRuntime] = useState('');
    const [rating, setRating] = useState('Not Rated');
    const [ranking, setRanking] = useState('');
    const [description, setDescription] = useState('');
    const [director, setDirector] = useState('');
    const [actors, setActors] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const films = {
            name, year, runtime, rating, ranking, description, director, actors
        }
        await postFilm(films);
        filmData();
        setName('');
        setYear('');
        setRuntime('');
        setRating('Not Rated');
        setRanking('');
        setDescription('');
        setDirector('');
        setActors('');
       
    }

    return (
        <div className="create">
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} placeholder="film name" required onChange={(e) => { setName(e.target.value)} }></input>
                <input type="number" value={year} placeholder="year release" required onChange={(e) => { setYear(e.target.value) }}  ></input>
                <input type="number" value={runtime} placeholder="runtime in minutes" required onChange={(e) => { setRuntime(e.target.value) }} ></input>
                <select value={rating} onChange={(e) => { setRating(e.target.value) }} >
                    <option value="Not Rated">Not Rated</option>
                    <option value="U">U</option>
                    <option value="PG">PG</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                    <option value="X">X</option>
                </select>
                <input type="number" value={ranking} placeholder="meta ranking" required onChange={(e) => { setRanking(e.target.value) }} ></input>
                <textarea value={description} placeholder="description" onChange={(e) => { setDescription(e.target.value) }} ></textarea>
                <input type="text" value={director} placeholder="director" required onChange={(e) => { setDirector(e.target.value) }} ></input>
                <input type="text" value={actors} placeholder="actors" required onChange={(e) => { setActors(e.target.value) }} ></input>
                <button>Add Film</button>
            </form>
            
        </div>
    )

}

FilmForm.propTypes = {
    filmData: PropTypes.func.isRequired
};
export default FilmForm;