import 'chart.js/auto';
import "./App.css"

import React, {ReactElement} from 'react';
import {
    Box,
    ChakraProvider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    Link as ChakraLink,
    useDisclosure
} from "@chakra-ui/react";
import {GlobalContextProvider} from "./utils/Context"
import {ExpenseScreen} from "./components/expense/ExpenseScreen";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {theme} from "./theme";
import {RouterProvider} from "react-router";
import {createBrowserRouter, Link} from "react-router-dom";
import {RevenueScreen} from "./components/revenue/RevenueScreen";
import {TagScreen} from "./components/tag/TagScreen";
import {AnalyzeScreen} from "./components/analyze2/AnalyzeScreen";
import {CgMore} from "react-icons/cg";
import {AiOutlineHome, AiOutlineTags} from 'react-icons/ai';
import {GiPayMoney, GiReceiveMoney} from 'react-icons/gi';
import {Modals} from "./components/Modals";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AnalyzeScreen/>
    },
    {
        path: '/expense',
        element: <ExpenseScreen/>
    },
    {
        path: '/revenue',
        element: <RevenueScreen/>
    },
    {
        path: '/tag',
        element: <TagScreen/>
    }
])

interface NavigationLinkProps {
    name: string,
    href: string,
    icon?: ReactElement
}

const NavigationLink = (props: NavigationLinkProps) => {
    const {name, href, icon} = props
    return (
        <ChakraLink
            to={href}
            as={Link}
            display={"flex"}
            gap={2}
            alignItems={"center"}
            fontSize={"2xl"}
        >
            {icon}
            {name}
        </ChakraLink>
    )
}

export const Navigation = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = React.useRef(null)

    return (
        <>
            <IconButton
                aria-label={"more icon"}
                icon={<CgMore/>}
                ref={btnRef}
                colorScheme='teal'
                onClick={onOpen}
                position={"fixed"}
                top={"1em"}
                right={"1em"}
                size={"lg"}
                variant={"outline"}
                rounded={"full"}
            />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader>
                        Money, money, money...
                    </DrawerHeader>
                    <DrawerCloseButton/>

                    <DrawerBody
                        display={"flex"}
                        flexDirection={"column"}
                    >
                        <Box>
                        </Box>
                        <NavigationLink
                            icon={<AiOutlineHome/>}
                            href={"/"}
                            name={"Home"}
                        />
                        <NavigationLink
                            icon={<GiPayMoney/>}
                            href={"/expense"}
                            name={"Expenses"}
                        />
                        <NavigationLink
                            icon={<GiReceiveMoney/>}
                            href={"/revenue"}
                            name={"Revenues"}
                        />
                        <NavigationLink
                            icon={<AiOutlineTags/>}
                            href={"/tag"}
                            name={"Tags"}
                        />
                    </DrawerBody>

                    <DrawerFooter>
                        {/*<Button*/}
                        {/*    variant='outline'*/}
                        {/*    mr={3}*/}
                        {/*    onClick={onClose}*/}
                        {/*>*/}
                        {/*    Cancel*/}
                        {/*</Button>*/}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

function App() {
    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <GlobalContextProvider>
                    <Modals/>
                    <RouterProvider router={router}/>
                </GlobalContextProvider>
            </ChakraProvider>
        </Provider>
    );
}

export default App;
