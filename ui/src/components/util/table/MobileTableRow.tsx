import {Amount} from "../../../redux/generated/redux-api";
import {Collapse, Fade, IconButton, Td, Text, Tr} from "@chakra-ui/react";
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
                >
                    <Fade in={!isOpen}>
                        <Text>
                            {value.name}
                        </Text>
                    </Fade>
                </Td>
                <Td
                    isNumeric
                >
                    <Collapse in={!isOpen}>
                        <AnyAmountComponent amount={value.amount}/>
                    </Collapse>
                    <Collapse in={isOpen}>
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
                    </Collapse>
                </Td>
                <Td
                    isNumeric
                    p={0}
                    pr={2}
                    borderRadius={16}
                >
                    <IconButton
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