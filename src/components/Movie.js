import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
    const [movie, setMovie] = useState({});
    let { id } = useParams();
    useEffect(() => {
        let myMovie = {
            id: 1,
            title: "harry potter",
            description: "magic movie",
            release_date: "2000-11-22",
            runtime: 116,
            mpaa_rating: "PG-13",
        }
        setMovie(myMovie)
    }, [id])
    return (
        <div>
            <h2>Movie: {movie.title}</h2>
            <small><em>{movie.release_date}, {movie.runtime} minutes, Rated: {movie.mpaa_rating}</em></small>
            <hr></hr>
            <p>{movie.description}</p>
        </div>
    )
}

export default Movie