import {Amount} from "../../../redux/generated/redux-api";
import {Box, Collapse, Fade, IconButton, Td, Text, Tr} from "@chakra-ui/react";
import {AmountTableCell} from "./AmountTableCell";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {Fragment} from "react";
import {ActionButtonsTableCell} from "./ActionButtonsTableCell";
import {mapResponseToRequest} from "../dynamic-table/util";
import {openModal} from "../../../redux/slice/modal-slice";
import {askForDelete} from "../../../redux/slice/delete-modal-slice";
import {useAppDispatch} from "../../../redux/hooks";
import {AnyResourceResponse, ResourceType} from "../../../redux/slice/types";

interface Props {
    isOpen: boolean,
    onOpenToggle: () => void,
    content: JSX.Element,
    isLast?: boolean,
    resourceType: ResourceType,
    value: AnyResourceResponse
}

export const AnyAmountComponent = (props: { amount: number | Amount }) => {
    const {amount} = props

    const data: Amount = isNaN(Number(amount)) ? amount as Amount : {
        type: "CONSTANT",
        data: {
            value: amount as number
        }
    }

    return (
        <AmountTableCell amount={data}/>
    )
}

export const MobileTableRow = (props: Props) => {
    const {value, content, isOpen, onOpenToggle, isLast, resourceType} = props

    const dispatch = useAppDispatch()

    return (
        <Fragment>
            <Tr>
                <Td
                    whiteSpace={"break-spaces"}
                    borderRadius={16}
                    w={"100%"}
                >
                    <Fade in={!isOpen}>
                        <Text>
                            {value.name}
                        </Text>
                    </Fade>
                </Td>
                <Td isNumeric>
                    <Fade in={!isOpen}>
                        <AnyAmountComponent amount={value.amount}/>
                    </Fade>
                </Td>
                <Td
                    isNumeric
                    position={"relative"}
                    py={0}
                    px={3}
                    width={"100%"}
                >
                    <IconButton
                        ml={3}
                        aria-label={'edit'}
                        icon={
                            <ChevronDownIcon
                                transition={"all"}
                                transitionDuration={".5s"}
                                transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                            />
                        }
                        variant={'ghost'}
                        onClick={onOpenToggle}
                    />
                    <Box
                        position={"absolute"}
                        top={"50%"}
                        transform={`translate(${isOpen ? -100 : 100}%, -50%)`}
                        opacity={isOpen ? 1 : 0}
                        transition={".3s"}
                    >
                        <ActionButtonsTableCell
                            onEdit={() => {
                                dispatch(openModal({
                                    modal: resourceType,
                                    value: mapResponseToRequest(resourceType, value),
                                    id: value.id
                                }))
                            }}
                            onDelete={() => {
                                dispatch(askForDelete({
                                    type: resourceType,
                                    name: value.name,
                                    id: value.id
                                }))
                            }}
                        />
                    </Box>
                </Td>
            </Tr>
            <Tr>
                <Td
                    py={0}
                    colSpan={3}
                    whiteSpace={"break-spaces"}
                    borderRadius={16}
                >
                    <Collapse
                        animateOpacity
                        in={isOpen}
                    >
                        {content}
                    </Collapse>
                </Td>
            </Tr>
        </Fragment>
    )
}