import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

//react router
import { BrowserRouter as Router } from 'react-router-dom'

//redux
import { Provider } from 'react-redux'
import store from './store.jsx'

//react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </Router>,
)
