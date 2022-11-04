import {Box, Flex, IconButton} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router";

interface NavigationIcon {
    icon: JSX.Element,
    to: string
}

interface Props {
    icons: [NavigationIcon, NavigationIcon, NavigationIcon, NavigationIcon],
    onAdd: () => void
}

export const ScreenNavigation = (props: Props) => {
    const {icons, onAdd} = props

    const navigate = useNavigate()

    return (
        <Box py={4}>
            <Flex
                className={"bg-red"}
                px={4}
                justifyContent={"space-between"}
                fontSize={"2em"}
            >
                <IconButton
                    aria-label={""}
                    icon={icons[0].icon}
                    variant={'ghost'}
                    fontSize={"1.1em"}
                    onClick={() => navigate(icons[0].to)}
                />
                <IconButton
                    aria-label={""}
                    icon={icons[1].icon}
                    variant={'ghost'}
                    fontSize={"1.1em"}
                    onClick={() => navigate(icons[1].to)}
                />
                <IconButton
                    aria-label={""}
                    icon={<AddIcon/>}
                    size={'lg'}
                    shadow={"2xl"}
                    onClick={onAdd}
                />
                <IconButton
                    aria-label={""}
                    icon={icons[2].icon}
                    variant={'ghost'}
                    fontSize={"1.1em"}
                    onClick={() => navigate(icons[2].to)}
                />
                <IconButton
                    aria-label={""}
                    icon={icons[3].icon}
                    variant={'ghost'}
                    fontSize={"1.1em"}
                    onClick={() => navigate(icons[3].to)}
                />
            </Flex>
        </Box>
    )
}