import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouteProvider } from 'react-router-dom'
import MainMenu from './MainMenu.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>404 Not Found</div>, 
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouteProvider router={router}/>
  </React.StrictMode>
)
