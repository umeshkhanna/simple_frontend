import { useEffect, useState } from "react";
import { json, useNavigate, useOutletContext, useParams } from "react-router-dom";
import Input from "./form/Input";
import Select from "./form/Select";
import TextArea from "./form/TextArea";
import CheckBox from "./form/CheckBox";
import Swal from "sweetalert2";

const EditMovie = () => {
    const navigate = useNavigate()
    const { jwtToken } = useOutletContext()
    const [error, setError] = useState(null)
    const [errors, setErrors] = useState([])
    const mpaaOptions = [
        { id: "G", value: "G" },
        { id: "PG", value: "PG" },
        { id: "R", value: "R" },
        { id: "18A", value: "18A" },
        { id: "PG-13", value: "PG-13" },
        { id: "NC17", value: "NC17" }
    ]
    const hasError = (key) => {
        return errors.indexOf(key) !== -1;
    }
    const [movie, setMovie] = useState({
        id: 0,
        title: "",
        release_date: "",
        mpaa_rating: "",
        description: "",
        runtime: "",
        genres: [],
        genres_array: [Array(13).fill(false)]
    })

    let { id } = useParams()

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login")
            return
        }
        if (id == 0) {
            setMovie({
                id: 0,
                title: "",
                release_date: "",
                mpaa_rating: "",
                description: "",
                runtime: "",
                genres: [],
                genres_array: [Array(13).fill(false)]
            })

            const headers = new Headers()
            headers.append("Content-Type", "application/json")

            const requestOptions = {
                method:"GET",
                headers: headers
            }

            fetch(`http://localhost:8080/genres`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    const checks = [];
                    data.forEach(g => {
                        checks.push({id:g.id, checked: false, genre:g.genre});
                    });

                    setMovie(m => ({
                        ...m,
                        genres: checks,
                        genres_array:[]
                    }))
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            console.log("edit")
        }
    }, [id, jwtToken, navigate])

    const handleChange = () => (event) => {
        let value = event.target.value
        let name = event.target.name
        setMovie({
            ...movie,
            [name]: value,
        })
    }

    const handleCheck = (event, position) => {
        var tmpArr = movie.genres
        tmpArr[position].checked = !tmpArr[position].checked

        var tmpIDs = movie.genres_array
        if(!event.target.checked){
            tmpIDs.splice(tmpIDs.indexOf(event.target.value))
        }else{
            tmpIDs.push(parseInt(event.target.value, 10))
        }

        setMovie({
            ...movie,
            genres_array: tmpIDs
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let errors = []
        let required = [
            { field:movie.title, name:"title" },
            { field:movie.release_date, name:"release_date" },
            { field:movie.runtime, name:"runtime" },
            { field:movie.description, name:"description" },
            { field:movie.mpaa_rating, name:"mpaa_rating" },
        ]

        required.forEach(function(obj){
            if(obj.field === ""){
                errors.push(obj.name)
            }
        })

        if(movie.genres_array.length === 0){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'You must choose atleast one genre!',
                confirmButtonText: 'OK'
              })
            errors.push("genre")
        }

        setErrors(errors)
        if (errors.length > 0){
            return false
        }

        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", "Bearer " + jwtToken)

        let method = "PUT"
        if (movie.id > 0){
            method = "PATCH"
        }
        const requestBody = movie
        requestBody.release_date = new Date(movie.release_date)
        requestBody.runtime = parseInt(movie.runtime, 10)
        const requestOptions = {
            body: JSON.stringify(requestBody),
            method: method,
            headers: headers,
            credentials: "same-origin"
        }
        fetch(`http://localhost:8080/admin/movie/${movie.id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error){
                    console.log(data.error)
                }else{
                    navigate("/admin/manage-catalogue")
                }

            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <h2>Add / Edit Movie</h2>
            <hr></hr>
            {/* <pre>{JSON.stringify(movie, null, 3)}</pre> */}
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
                <hr />
            <h3>Genres</h3>
            {movie.genres && movie.genres.length > 1 &&
                <>
                    {Array.from(movie.genres).map((g, index) => 
                        <CheckBox
                            title={g.genre}
                            name={"genre"}
                            id={"genre-" + index}
                            onChange={(event) => handleCheck(event, index)}
                            value={g.id}
                            checked={movie.genres[index].checked}
                            key={index}
                        />
                    )}
                </>
            }
            <hr />
            <button className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}

export default EditMovie;