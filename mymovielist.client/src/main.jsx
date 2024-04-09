import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MoviesPage from './MoviesPage.jsx'
import MoviesComponent from './MoviesComponent.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <App />
        <MoviesPage/>
        <MoviesComponent />
  </React.StrictMode>,
)
