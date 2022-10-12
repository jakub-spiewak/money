import {extendTheme, ThemeConfig} from "@chakra-ui/react";

const config: ThemeConfig = {
    cssVarPrefix: "spiewak",
    initialColorMode: 'dark',
    useSystemColorMode: false
}

export const theme = extendTheme({config})
