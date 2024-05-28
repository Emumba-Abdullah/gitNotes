import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import authStore from "./Store/store.ts"

ReactDOM.createRoot(document.getElementById('root')!).render(
   <Provider store={authStore}>
  <React.StrictMode>
    <App />
    </React.StrictMode>,
    </Provider>
)
