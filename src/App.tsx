import React from 'react';
import "./App.css"
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {GlobalContextProvider} from "./utils/Context"
import {PersonScreen} from "./components/person/PersonScreen";

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const theme = extendTheme(config)

function App() {
    return (
        <ChakraProvider theme={theme}>
            <GlobalContextProvider>
                <PersonScreen/>
            </GlobalContextProvider>
        </ChakraProvider>
    );
}

export default App;
