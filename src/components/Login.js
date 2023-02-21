import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Input from "./form/Input";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setJwtToken, setAlertMessage, setAlertClassName, toggleRefresh } = useOutletContext();
    const navigate = useNavigate()

    const handleSubmit = ((event) => {
        event.preventDefault();
        console.log("email/pass", email, password)
        //build the request payload
        var payload = {
            email: email,
            password: password
        }

        var requestOptions = {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            creadentials: 'include',
            body: JSON.stringify(payload)
        }

        fetch(`/authenticate`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error){
                    setAlertClassName("alert-danger")
                    setAlertMessage(data.message)
                }else{
                    setJwtToken(data.access_token)
                    setAlertClassName("d-none")
                    setAlertMessage("")
                    toggleRefresh(true)
                    navigate("/")
                }
            })
            .catch(error => {
                setAlertClassName("alert-danger")
                setAlertMessage(error)
            })
    })
    return(
        <div className="col-md-6 offset-md-3">
            <h2>Login</h2>
            <hr></hr>
            <form onSubmit={handleSubmit}>
                <Input 
                    title="Email Address"
                    type="email"
                    className="form-control"
                    name="email"
                    autoComplete="email-new"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Input 
                    title="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password-new"
                    onChange={(event) => setPassword(event.target.value)}
                />

                <hr />
                <input 
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
            </form>
        </div>
    )
}

export default Login;