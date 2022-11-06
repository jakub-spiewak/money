import {Box, Flex, IconButton} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router";

interface NavigationIcon {
    icon: JSX.Element,
    to: string
}

interface Props {
    icons: [NavigationIcon, NavigationIcon, NavigationIcon, NavigationIcon],
    centerItem: JSX.Element
}

export const DefaultNavigationAddButton = (props: { onAdd: () => void }) => {
    const {onAdd} = props
    return (
        <IconButton
            aria-label={""}
            icon={<AddIcon/>}
            onClick={onAdd}
        />
    )
}

export const ScreenNavigation = (props: Props) => {
    const {icons, centerItem} = props

    const navigate = useNavigate()

    return (
        <Box py={4}>
            <Flex
                className={"bg-red"}
                px={4}
                justifyContent={"space-between"}
            >
                <IconButton
                    aria-label={""}
                    icon={icons[0].icon}
                    variant={'ghost'}
                    fontSize={"1.5em"}
                    onClick={() => navigate(icons[0].to)}
                />
                <IconButton
                    aria-label={""}
                    icon={icons[1].icon}
                    variant={'ghost'}
                    fontSize={"1.5em"}
                    onClick={() => navigate(icons[1].to)}
                />
                {centerItem}
                <IconButton
                    aria-label={""}
                    icon={icons[2].icon}
                    variant={'ghost'}
                    fontSize={"1.5em"}
                    onClick={() => navigate(icons[2].to)}
                />
                <IconButton
                    aria-label={""}
                    icon={icons[3].icon}
                    variant={'ghost'}
                    fontSize={"1.5em"}
                    onClick={() => navigate(icons[3].to)}
                />
            </Flex>
        </Box>
    )
}