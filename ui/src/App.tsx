import 'chart.js/auto';
import "./App.css"

import React from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import {GlobalContextProvider} from "./utils/Context"
import {ExpenseTableScreen} from "./components/expense-table/ExpenseTableScreen";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {theme} from "./theme";
import {Route, Routes} from "react-router";
import {RevenueTableScreen} from "./components/revenue-table/RevenueTableScreen";
import {TagScreen} from "./components/tag/TagScreen";
import {ExpenseScreen} from "./components/expenses-screen/ExpenseScreen";
import {Modals} from "./components/Modals";
import {RevenueScreen} from "./components/revenue-screen/RevenueScreen";
import {BrowserRouter} from "react-router-dom";
import {GlobalScreenNavigationContainer} from "./components/util/GlobalScreenNavigationContainer";

function App() {
    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <GlobalContextProvider>
                    <Modals/>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path={""}
                                element={
                                    <GlobalScreenNavigationContainer>
                                        <ExpenseScreen/>
                                    </GlobalScreenNavigationContainer>
                                }
                            />
                            <Route
                                path={"/expense"}
                                element={
                                    <GlobalScreenNavigationContainer>
                                        <ExpenseScreen/>
                                    </GlobalScreenNavigationContainer>}
                            />
                            <Route
                                path={"/expense-table"}
                                element={
                                    <GlobalScreenNavigationContainer>
                                        <ExpenseTableScreen/>
                                    </GlobalScreenNavigationContainer>}
                            />
                            <Route
                                path={"/revenue"}
                                element={
                                    <GlobalScreenNavigationContainer>
                                        <RevenueScreen/>
                                    </GlobalScreenNavigationContainer>
                                }
                            />
                            <Route
                                path={"/revenue-table"}
                                element={
                                    <GlobalScreenNavigationContainer>
                                        <RevenueTableScreen/>
                                    </GlobalScreenNavigationContainer>
                                }
                            />
                            <Route
                                path={"/tag"}
                                element={
                                    <GlobalScreenNavigationContainer>
                                        <TagScreen/>
                                    </GlobalScreenNavigationContainer>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </GlobalContextProvider>
            </ChakraProvider>
        </Provider>
    );
}

export default App;
