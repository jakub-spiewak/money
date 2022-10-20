import React from 'react';
import "./App.css"
import {ChakraProvider, Tab, TabList, TabPanels, Tabs} from "@chakra-ui/react";
import {GlobalContextProvider} from "./utils/Context"
import {PersonScreen} from "./components/person/PersonScreen";
import {TagScreen} from "./components/tag/TagScreen";
import {ExpenseScreen} from "./components/expense/ExpenseScreen";
import {AnalyzeScreen} from "./components/analyze/AnalyzeScreen";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {theme} from "./theme";
import {ScreenTabPanel} from "./components/util/ScreenTabPanel";
import {RevenueScreen} from "./components/revenue/RevenueScreen";

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
                            <ScreenTabPanel>
                                <PersonScreen/>
                            </ScreenTabPanel>
                            <ScreenTabPanel>
                                <TagScreen/>
                            </ScreenTabPanel>
                            <ScreenTabPanel>
                                <RevenueScreen/>
                            </ScreenTabPanel>
                            <ScreenTabPanel>
                                <ExpenseScreen/>
                            </ScreenTabPanel>
                            <ScreenTabPanel>
                                <AnalyzeScreen/>
                            </ScreenTabPanel>
                        </TabPanels>
                    </Tabs>
                </GlobalContextProvider>
            </ChakraProvider>
        </Provider>
    );
}

export default App;
