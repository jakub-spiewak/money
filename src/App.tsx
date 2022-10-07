import React from 'react';
import "./App.css"
import {ChakraProvider, extendTheme, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {GlobalContextProvider} from "./utils/Context"
import {PersonScreen} from "./components/person/PersonScreen";
import {TagScreen} from "./components/tags/TagScreen";

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const theme = extendTheme(config)

function App() {
    return (
        <ChakraProvider theme={theme}>
            <GlobalContextProvider>
                {/*<BrowserRouter>*/}
                {/*    <Routes>*/}
                {/*        <Route*/}
                {/*            path={"/person"}*/}
                {/*            element={<PersonScreen/>}*/}
                {/*        />*/}
                {/*        <Route*/}
                {/*            path={"/"}*/}
                {/*            element={<LandingScreen/>}*/}
                {/*        />*/}
                {/*    </Routes>*/}
                {/*</BrowserRouter>*/}
                <Tabs>
                    <TabList>
                        <Tab>Person</Tab>
                        <Tab>Tags</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <PersonScreen/>
                        </TabPanel>
                        <TabPanel>
                            <TagScreen/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </GlobalContextProvider>
        </ChakraProvider>
    );
}

export default App;
