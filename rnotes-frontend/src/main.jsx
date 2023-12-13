import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProvider } from './contexts/UserContext.jsx'
import { NoteProvider } from './contexts/NoteContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoteProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </NoteProvider>
  </React.StrictMode>,
)
