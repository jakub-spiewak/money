import {jsx} from "@emotion/react";
import {Box, Flex, useBreakpointValue} from "@chakra-ui/react";
import {useMemo} from "react";
import JSX = jsx.JSX;

interface Props {
    children?: JSX.Element[],
}

export const DynamicGrid = (props: Props) => {
    const {children = []} = props
    const chunksAmount = useBreakpointValue({base: 1, md: 2, lg: 3, xl: 4}, {fallback: 'base'}) || 1

    const chunks: JSX.Element[][] = useMemo(() => {
        const result: JSX.Element[][] = []

        for (let i = 0; i < children.length; i++) {
            const currentIndex = i % chunksAmount
            if (!result[currentIndex]) {
                result.push([])
            }

            result[currentIndex].push(children[i])
        }

        return result;
    }, [children, chunksAmount])

    return (
        <Flex
            gap={4}
            justifyContent={'center'}
        >
            {
                chunks.map((chunk, index) => (
                    <Flex
                        key={`dynamic_grid_chunk_${index}`}
                        flexDirection={'column'}
                        gap={4}
                        w={'full'}
                    >
                        {
                            chunk.map((element, index) => (
                                <Box
                                    borderRadius={16}
                                    borderWidth={1}
                                    key={`dynamic_grid_chunk_item_${index}`}
                                    width={'full'}
                                >
                                    {element}
                                </Box>
                            ))
                        }
                    </Flex>
                ))
            }
        </Flex>
    );
};