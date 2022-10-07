import React from 'react';
import "./App.css"
import {ChakraProvider, extendTheme, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {GlobalContextProvider} from "./utils/Context"
import {PersonScreen} from "./components/person/PersonScreen";
import {TagScreen} from "./components/tag/TagScreen";
import {RevenueScreen} from "./components/revenue/RevenueScreen";

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const theme = extendTheme(config)

function App() {
    return (
        <ChakraProvider theme={theme}>
            <GlobalContextProvider>
                <Tabs>
                    <TabList>
                        <Tab>Person</Tab>
                        <Tab>Tags</Tab>
                        <Tab>Revenue</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <PersonScreen/>
                        </TabPanel>
                        <TabPanel>
                            <TagScreen/>
                        </TabPanel>
                        <TabPanel>
                            <RevenueScreen/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </GlobalContextProvider>
        </ChakraProvider>
    );
}

export default App;
