import {TagTable} from "./TagTable";

import {useReadTagQuery,} from "../../redux/generated/redux-api";
import {TagNavigation} from "./TagNavigation";
import {VStack} from "@chakra-ui/react";

export const TagScreen = () => {
    const {data, isLoading, isFetching} = useReadTagQuery()

    return (
        <>
            <TagNavigation/>
            <VStack
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <TagTable
                    data={data || []}
                    isLoading={isLoading || isFetching}
                />
            </VStack>
        </>
    )
}