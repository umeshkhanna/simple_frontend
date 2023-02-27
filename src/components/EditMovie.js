import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Input from "./form/Input";
import Select from "./form/Select";
import TextArea from "./form/TextArea";

const EditMovie = () => {
    const navigate = useNavigate()
    const { jwtToken } = useOutletContext()
    const [error, setError] = useState(null)
    const [errors, setErrors] = useState([])
    const mpaaOptions = [
        {id:"G", value:"G"},
        {id:"PG", value:"PG"},
        {id:"R", value:"R"},
        {id:"18A", value:"18A"},
        {id:"PG-13", value:"PG-13"},
        {id:"NC17", value:"NC17"}
    ]
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
                <Input
                    title={"Release Date"}
                    className={"form-control"}
                    name={"release_date"}
                    type={"date"}
                    value={movie.release_date}
                    onChange={handleChange("release_date")}
                    errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
                    errorMsg={"Please enter a release date"}
                />
                <Input
                    title={"Runtime"}
                    className={"form-control"}
                    name={"runtime"}
                    type={"text"}
                    value={movie.runtime}
                    onChange={handleChange("runtime")}
                    errorDiv={hasError("runtime") ? "text-danger" : "d-none"}
                    errorMsg={"Please enter a Runtime"}
                />
                <Select
                    title={"MPAA Rating"}
                    name={"mpaa_rating"}
                    options={mpaaOptions}
                    onChange={handleChange("mpaa_rating")}
                    errorDiv={hasError("mpaa_rating") ? "text-danger" : "d-none"}
                    errorMsg={"Please Choose"}
                    placeHolder={"choose..."}
                />
                <TextArea
                    title={"Description"}
                    name={"description"}
                    onChange={handleChange("description")}
                    errorDiv={hasError("description") ? "text-danger" : "d-none"}
                    errorMsg={"Please Enter Description"}
                    value={movie.description}
                    rows={"3"}
                />
            </form>
        </div>
    )
}

export default EditMovie;