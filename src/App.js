import { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Alert from './components/Alert';
function App() {
  const [jwtToken, setJwtToken] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [alertClassName, setAlertClassName] = useState("d-none")
  const [tickingInterval, setTickingInterval] = useState()
  const navigate = useNavigate()
  const logOut = () => {
    const requestOptions = {
      method:"GET",
      credentials: "include"
    }
    fetch(`/logout`, requestOptions)
      .catch(error => {
        console.log("error logging out", error)
      })
      .finally(() => {
        setJwtToken("")
        toggleRefresh(false)
      })
    navigate("/login")
  }

  const toggleRefresh = useCallback((status) => {
    if(status){
      let i = setInterval(() => {
        const requestOptions = {
          method :"GET",
          credentials : "include"
        }
  
        fetch(`/refresh`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.access_token){
              setJwtToken(data.access_token)
            }
          })
          .catch(error => {
            console.log("user is not logged in!")
          })
      }, 600000)
      setTickingInterval(i)
      console.log("setting tickinterval to", i)
    }else{
      console.log("turn off tickinterval", tickingInterval)
      setTickingInterval(null)
      clearInterval(tickingInterval)
    }
  }, [tickingInterval])

  useEffect(() => {
    if (jwtToken === ""){
      console.log("test")
      const requestOptions = {
        method :"GET",
        credentials : "include"
      }

      fetch(`/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token){
            setJwtToken(data.access_token)
            toggleRefresh(true)
          }
        })
        .catch(error => {
          console.log("user is not logged in!")
        })
    }
  }, [jwtToken, toggleRefresh])

  
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Lets Watch a Movie!</h1>
        </div>
        <div className="col text-end">
          {jwtToken === ""
            ? <Link to="login"><span className="badge bg-success">Login</span></Link>
            : <a href="#!" onClick={logOut}><span className="badge bg-danger">Logout</span></a>
          }
        </div>
        <hr className="mb-3"></hr>
      </div>
      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">Home</Link>
              <Link to="/movies" className="list-group-item list-group-item-action">Movies</Link>
              <Link to="/genres" className="list-group-item list-group-item-action">Genres</Link>
              {jwtToken !== "" &&
                <>
                  <Link to="/admin/movie/0" className="list-group-item list-group-item-action">Add Movie</Link>
                  <Link to="/admin/manage-catalogue" className="list-group-item list-group-item-action">Manage Catalogue</Link>
                  <Link to="/graphql" className="list-group-item list-group-item-action">Graphql</Link>
                </>
              }
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <Alert
            message={alertMessage}
            className={alertClassName}
          />
          <Outlet context={{
            jwtToken, setJwtToken, setAlertClassName, setAlertMessage, toggleRefresh
          }} />
        </div>
      </div>
    </div>
  );
}

export default App;
