import React from 'react';
import "./App.css"
import {ChakraProvider, extendTheme, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {GlobalContextProvider} from "./utils/Context"
import {PersonScreen} from "./components/person/PersonScreen";
import {TagScreen} from "./components/tag/TagScreen";
import {RevenueScreen} from "./components/revenue/RevenueScreen";
import {ExpenseScreen} from "./components/expense/ExpenseScreen";
import {AnalyzeScreen} from "./components/analyze/AnalyzeScreen";

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
                        <Tab>Expense</Tab>
                        <Tab>Analyze</Tab>
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
                        <TabPanel>
                            <ExpenseScreen/>
                        </TabPanel>
                        <TabPanel>
                            <AnalyzeScreen/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </GlobalContextProvider>
        </ChakraProvider>
    );
}

export default App;
