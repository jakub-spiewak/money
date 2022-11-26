import 'chart.js/auto';
import "./App.css"

import React, {lazy, Suspense} from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import {GlobalContextProvider} from "./utils/Context"
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {theme} from "./theme";
import {Route, Routes} from "react-router";
import {Modals} from "./components/Modals";
import {GlobalScreenNavigationContainer} from "./components/util/GlobalScreenNavigationContainer";

import {BrowserRouter} from "react-router-dom";

const ExpenseTableScreen = lazy(() => import("./components/expense-table/ExpenseTableScreen"));
const RevenueTableScreen = lazy(() => import( "./components/revenue-table/RevenueTableScreen"));
const ExpenseScreen = lazy(() => import( "./components/expenses-screen/ExpenseScreen"));
const AnalyzeScreen = lazy(() => import("./components/analyze/AnalyzeScreen"));
const RevenueScreen = lazy(() => import( "./components/revenue-screen/RevenueScreen"));
const TagScreen = lazy(() => import( "./components/tag/TagScreen"));

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
                                    <Suspense>
                                        <GlobalScreenNavigationContainer>
                                            <ExpenseScreen/>
                                        </GlobalScreenNavigationContainer>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={"/expense"}
                                element={
                                    <Suspense>
                                        <GlobalScreenNavigationContainer>
                                            <ExpenseScreen/>
                                        </GlobalScreenNavigationContainer>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={"/expense-table"}
                                element={
                                    <Suspense>
                                        <GlobalScreenNavigationContainer>
                                            <ExpenseTableScreen/>
                                        </GlobalScreenNavigationContainer>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={"/revenue"}
                                element={
                                    <Suspense>
                                        <GlobalScreenNavigationContainer>
                                            <RevenueScreen/>
                                        </GlobalScreenNavigationContainer>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={"/revenue-table"}
                                element={
                                    <Suspense>
                                        <GlobalScreenNavigationContainer>
                                            <RevenueTableScreen/>
                                        </GlobalScreenNavigationContainer>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={"/analyze"}
                                element={
                                    <Suspense>
                                        <GlobalScreenNavigationContainer>
                                            <AnalyzeScreen/>
                                        </GlobalScreenNavigationContainer>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={"/tag"}
                                element={
                                    <Suspense>
                                        <GlobalScreenNavigationContainer>
                                            <TagScreen/>
                                        </GlobalScreenNavigationContainer>
                                    </Suspense>
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
