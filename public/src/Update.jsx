import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
function UpdateFilm() {
    const { id } = useParams();
    const [values, setValues] = useState({
        id: id,
        name: '',
        year: '',
        runtime: '',
        rating: 'Not Rated',
        ranking: '',
        description: '',
        director: '',
        actors: ''
    })
    const data = async () => {
        try {         
            const result = await axios.get(`http://localhost:4444/api/v1/list/films/${id}`);
            setValues({
                ...values,
                name: result.data.film.name,
                year: result.data.film.year,
                runtime: result.data.film.runtime,
                rating: result.data.film.rating,
                ranking: result.data.film.ranking,
                description: result.data.film.description,
                director: result.data.film.director,
                actors: result.data.film.actors
            }
            )
        }
        catch (err) {
            console.log(err)
        }
    }
    const navigate = useNavigate()
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`http://localhost:4444/api/v1/list/films/${id}`, values, { headers: { 'Content-Type': 'application/json' } })
            console.log(res)
            navigate('/')
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
       data()
    }, [])

    return(
        <div className="create">
            <form onSubmit={handleUpdate}>
                <input type="text" value={values.name} onChange={(e) => { setValues({ ...values, name: e.target.value }) }}></input>
                <input type="number" value={values.year} onChange={(e) => { setValues({ ...values, year: e.target.value }) }}></input>
                <input type="number" value={values.runtime} onChange={(e) => { setValues({ ...values, runtime: e.target.value }) }}></input>
                <select>
                    <option value="Not Rated" onChange={(e) => { setValues({ ...values, rating: e.target.value }) }}>Not Rated</option>
                    <option value="U" selected={values.rating === "U"}>U</option>
                    <option value="PG" selected={values.rating === "PG"}>PG</option>
                    <option value="12" selected={values.rating === "12"}>12</option>
                    <option value="15" selected={values.rating === "15"}>15</option>
                    <option value="X" selected={values.rating === "X"}>X</option>
                </select>
                <input type="number" value={values.ranking} onChange={(e) => { setValues({ ...values, ranking: e.target.value }) }}></input>
                <textarea value={values.description} onChange={(e) => { setValues({ ...values, description: e.target.value }) }}></textarea>
                <input type="text" value={values.director} onChange={(e) => { setValues({ ...values, director: e.target.value }) }}></input>
                <input type="text" value={values.actors} onChange={(e) => { setValues({ ...values, actors: e.target.value }) }}></input>
                <button>Update Film</button>
        </form>

    </div>
    )
}

export default UpdateFilm