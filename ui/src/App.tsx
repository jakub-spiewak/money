import React from 'react';
import "./App.css"
import {ChakraProvider, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {GlobalContextProvider} from "./utils/Context"
import {PersonScreen} from "./components/person/PersonScreen";
import {TagScreen} from "./components/tag/TagScreen";
import {RevenueScreen} from "./components/revenue/RevenueScreen";
import {ExpenseScreen} from "./components/expense/ExpenseScreen";
import {AnalyzeScreen} from "./components/analyze/AnalyzeScreen";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {theme} from "./theme";

function App() {
    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <GlobalContextProvider>
                    <Tabs defaultIndex={0}>
                        <TabList
                            maxW={"100vw"}
                            overflowX={"auto"}
                            overflowY={"hidden"}
                        >
                            <Tab>Person</Tab>
                            <Tab>Tags</Tab>
                            <Tab>Revenue</Tab>
                            <Tab>Expense</Tab>
                            <Tab>Analyze</Tab>
                        </TabList>
                        <TabPanels maxW={"100vw"}>
                            <TabPanel p={0}>
                                <PersonScreen/>
                            </TabPanel>
                            <TabPanel p={0}>
                                <TagScreen/>
                            </TabPanel>
                            <TabPanel p={0}>
                                <RevenueScreen/>
                            </TabPanel>
                            <TabPanel p={0}>
                                <ExpenseScreen/>
                            </TabPanel>
                            <TabPanel p={0}>
                                <AnalyzeScreen/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </GlobalContextProvider>
            </ChakraProvider>
        </Provider>
    );
}

export default App;
