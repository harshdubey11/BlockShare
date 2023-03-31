import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ChakraProvider } from '@chakra-ui/react'



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
<ChakraProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ChakraProvider>
);


// font-family: 'Cookie', cursive;
// font-family: 'Montserrat', sans-serif;