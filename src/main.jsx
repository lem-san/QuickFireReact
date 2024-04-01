import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// import { createBrowserRouter, RouteProvider } from 'react-router-dom'
// import MainMenu from './MainMenu.jsx';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <div><MainMenu /></div>, 
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
