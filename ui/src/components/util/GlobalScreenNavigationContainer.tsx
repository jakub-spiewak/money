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
            px={0}
            maxW={'4xl'}
        >
            {children}
            <Container
                position={"fixed"}
                bottom={0}
                left={"50%"}
                transform={"translateX(-50%)"}
                shadow={"2xl"}
                maxW={'4xl'}
                blur={2}
                bgColor={"gray.900"}
            >
                <Box>
                    <GlobalScreenNavigation/>
                </Box>
            </Container>
        </Container>
    )
}