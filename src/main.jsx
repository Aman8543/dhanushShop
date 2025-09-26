import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { BrowserRouter } from 'react-router'
import { ClerkProvider } from '@clerk/clerk-react'
 import { store } from './redux/stores.js'                                                        
import { Provider } from 'react-redux'

import categoryContext from './redux/global.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
      <BrowserRouter>
        <Provider store={store} >
         
            <App />
         
        </Provider>
      </BrowserRouter>
   
  </StrictMode>,
  
)
