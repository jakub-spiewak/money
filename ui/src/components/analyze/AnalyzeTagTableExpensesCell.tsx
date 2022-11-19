import {
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Table,
    Tbody,
    Td,
    Tr
} from "@chakra-ui/react";
import {InfoIcon} from "@chakra-ui/icons";
import {TagSummary} from "../../redux/generated/redux-api";

interface Props {
    tag: TagSummary
}

export const AnalyzeTagTableExpensesCell = (props: Props) => {
    const {tag} = props

    const {name, expenses} = tag

    return (
        <Popover isLazy>
            <PopoverTrigger>
                <IconButton
                    icon={<InfoIcon/>}
                    aria-label={'icon'}
                />
            </PopoverTrigger>
            <PopoverContent width={"unset"}>
                <PopoverArrow/>
                <PopoverCloseButton/>
                <PopoverHeader>Info
                    about: <b>{name}</b></PopoverHeader>
                <PopoverBody>
                    <Table
                        variant={'simple'}
                        size={'sm'}
                    >
                        <Tbody>
                            {
                                expenses?.map((e, index) => (
                                    <Tr key={`summary_expense_row_${index}`}>
                                        <Td>{e.name}</Td>
                                        <Td isNumeric>{e.amount?.toFixed(2) + ` (${e.factor}%)`}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}