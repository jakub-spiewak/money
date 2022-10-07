import {Container, IconButton} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {ViewIcon} from "@chakra-ui/icons";

export const LandingScreen = () => {
    return (
        <Container>
            <IconButton
                aria-label={'person'}
                icon={<ViewIcon/>}
            >
                Person
            </IconButton>
            <Link to={"/person"}>
                Person
            </Link>
        </Container>
    )
}