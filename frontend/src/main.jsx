import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { ClerkProvider } from '@clerk/clerk-react' 
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(

  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>    
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </ClerkProvider>
)
