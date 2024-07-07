import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FilmForm from './filmform';
function App() {
    const [data, setData] = useState([])
    

        const filmData = async () => {
            try {
                const res = await axios.get("http://localhost:4444/api/v1/list/films")
                console.log(res.data.films.name);
                setData(res.data.films)
            }
            catch (err) {
                console.log(err)
            }
    }
    const  handleDelete = async (filmID) => {
        try {
            
            await axios.delete(`http://localhost:4444/api/v1/list/films/${filmID}`)
            filmData();
        }
        catch (err)  {
            console.log(err)
        }
    }


    useEffect(() => {
        filmData();
    }, []);

  
    return (
        <div>
            {data.map((film) => (
                <div key={film._id} >
                    <h2>{film.name}</h2>
                    <p>{film.year}</p>
                    <p>{Math.floor(film.runtime / 60)} hrs {film.runtime % 60} mins </p>
                    <p>{film.rating}</p>
                    <p>{film.ranking}</p>
                    <p>{film.description}</p>
                    <p>{film.director}</p>
                    <p>{film.actors}</p>
                    <Link to={`/update/${film._id}`} >Update</Link>
                    <button type="button" onClick={() => { handleDelete(film._id) }} >Delete</button>
                </div>
            ))}
            <FilmForm filmData={filmData } />
        </div>
    );
}

export default App;