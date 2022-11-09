import {Box, Container} from "@chakra-ui/react";
import {GlobalScreenNavigation} from "./GlobalScreenNavigation";

interface Props {
    children: JSX.Element | JSX.Element[] | null
}

export const GlobalScreenNavigationContainer = (props: Props) => {
    const {children} = props
    return (
        <Container
            pb={20}
            minH={"100vh"}
            shadow={"2xl"}
        >
            {children}
            <Container
                bgColor={"gray.900"}
                position={"fixed"}
                bottom={0}
                left={"50%"}
                transform={"translateX(-50%)"}
                shadow={"2xl"}
            >
                <Box shadow={"2xl"}>
                    <GlobalScreenNavigation/>
                </Box>
            </Container>
        </Container>
    )
}