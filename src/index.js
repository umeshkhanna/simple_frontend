import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import EditMovie from './components/EditMovie';
import ErrorPage from './components/ErrorPage';
import Genres from './components/Genres';
import GraphQl from './components/GraphQl';
import Home from './components/Home';
import Login from './components/Login';
import ManageCatalogue from './components/ManageCatalogue';
import Movie from './components/Movie';
import Movies from './components/Movies';

const routerList = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    errorElement: <ErrorPage />,
    children:[
      {index:true, element:<Home />},
      {path:"/movies", element:<Movies />},
      {path:"/genres", element:<Genres />},
      {path:"/admin/movie/:id", element:<EditMovie />},
      {path:"/admin/manage-catalogue", element:<ManageCatalogue />},
      {path:"/login", element:<Login />},
      {path:"/graphql", element:<GraphQl />},
      {path:"/movie/:id", element:<Movie />},
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerList} />
  </React.StrictMode>
);
