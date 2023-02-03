import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App_bak'
import './samples/node-api'
import './index.scss'
import './tailwind.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
