import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/header/index'
import Footer from './components/footer/index'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Header />
      <App />
      <Footer />
    </ChakraProvider>
  </React.StrictMode>
)
