import React from 'react'
import ReactDOM from 'react-dom/client'
import {GameStates} from './gameStates';
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameStates />
  </React.StrictMode>,
)
