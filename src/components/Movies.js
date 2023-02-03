import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        let movieListings = [
            {
                id: 1,
                title: "harry potter",
                description: "magic movie",
                release_date: "2000-11-22",
                runtime: 116,
                mpaa_rating: "PG-13",
            },
            {
                id: 2,
                title: "Raiders of the lost ark",
                description: "adventure",
                release_date: "1981-06-12",
                runtime: 115,
                mpaa_rating: "PG-13",
            }
        ];
        setMovies(movieListings)
    }, [])
    return (
        <div>
            <h2>Movies</h2>
            <hr></hr>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Release Date</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((m) => (
                        <tr key={m.id}>
                            <td>
                                <Link to={`/movie/${m.id}`}>{m.title}</Link>
                            </td>
                            <td>{m.release_date}</td>
                            <td>{m.mpaa_rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Movies