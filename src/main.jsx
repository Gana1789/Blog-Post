import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from "./app/store"
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
const queryClient=new QueryClient();
export let persistor=persistStore(store);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
  <PersistGate persistor={persistor}>

    <Router>
      <Routes>

        <Route path="/*" element={<App/>}></Route>
      </Routes>
    </Router>
  </PersistGate>
   
    </QueryClientProvider>
  </Provider>
  </React.StrictMode>,
  
)
