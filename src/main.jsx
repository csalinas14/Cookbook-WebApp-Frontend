import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//react router
import { BrowserRouter as Router } from 'react-router-dom'

//redux
import { Provider } from 'react-redux'
import store from './store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
)
