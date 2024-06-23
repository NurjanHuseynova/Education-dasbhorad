import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from ".././src/app/store/store.js"

// import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <Toaster position="top-right" />

    <App />
  </Provider>,
)
