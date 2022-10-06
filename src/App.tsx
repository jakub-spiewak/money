import React from 'react';
import "./App.css"
import {PersonForm} from "./components/PersonForm";
import {ChakraProvider, extendTheme} from "@chakra-ui/react";

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const theme = extendTheme(config)

function App() {
    return (
        <ChakraProvider theme={theme}>
            <PersonForm />
        </ChakraProvider>
    );
}

export default App;
