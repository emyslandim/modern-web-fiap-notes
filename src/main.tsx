import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import { NotesProvider } from './contexts/notes';
import Home from './pages/Home';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotesProvider>
    <Home />
    </NotesProvider>
  </React.StrictMode>
)
