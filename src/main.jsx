import 'react-loading-skeleton/dist/skeleton.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import './assets/css/styles.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { SkeletonTheme } from 'react-loading-skeleton';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <SkeletonTheme color="#202020" highlightColor="#444">
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
        </SkeletonTheme>
  </React.StrictMode>,
)
