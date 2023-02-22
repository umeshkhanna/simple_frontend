import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Input from "./form/Input";

const EditMovie = () => {
    const navigate = useNavigate()
    const { jwtToken } = useOutletContext()
    const [error, setError] = useState(null)
    const [errors, setErrors] = useState([])
    const hasError = (key) => {
        return errors.indexOf(key) !== -1;
    }
    const [movie, setMovie] = useState({
        id:0,
        title:"",
        release_date:"",
        mpaa_rating:"",
        description:"",
        runtime:"",
    })

    let {id} = useParams()

    useEffect(() => {
        if (jwtToken === ""){
            navigate("/login")
            return
        }
    }, [jwtToken, navigate])

    const handleChange = () => (event) => {
        let value = event.target.value
        let name = event.target.name
        setMovie({
            ...movie,
            [name]: value,
    })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }
    return(
        <div>
            <h2>Add / Edit Movie</h2>
            <hr></hr>
            <pre>{JSON.stringify(movie, null, 3)}</pre>
            <form onSubmit={handleSubmit}>
                <input type="hidden" id="id" name="id" value={movie.id} />

                <Input
                    title={"Title"}
                    className={"form-control"}
                    name={"title"}
                    type={"text"}
                    value={movie.title}
                    onChange={handleChange("title")}
                    errorDiv={hasError("title") ? "text-danger" : "d-none"}
                    errorMsg={"Please enter a title"}
                />
            </form>
        </div>
    )
}

export default EditMovie;