import {Amount} from "../../../redux/generated/redux-api";
import {Collapse, Fade, IconButton, Td, Tr} from "@chakra-ui/react";
import {AmountTableCell} from "./AmountTableCell";
import {ChevronDownIcon} from "@chakra-ui/icons";

interface Props {
    name: string,
    amount: Amount | number,
    isOpen: boolean,
    onOpenToggle: () => void,
    content: JSX.Element,
}

export const MobileTableRow = (props: Props) => {
    const {name, amount, content, isOpen, onOpenToggle} = props


    return (
        <>
            <Tr>
                <Td>
                    <Fade in={!isOpen}>
                        {name}
                    </Fade>
                </Td>
                <Td isNumeric>
                    <Fade in={!isOpen}>
                        <AmountTableCell
                            /* @ts-ignore */
                            amount={
                            isNaN(Number(amount)) ?
                                amount :
                                {
                                    type: "CONSTANT",
                                    data: {value: amount}
                                }
                        }
                        />
                    </Fade>
                </Td>
                <Td
                    isNumeric
                    maxW={"100vw !important"}
                    overflow={"hidden"}
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
                >
                    <Collapse
                        animateOpacity
                        in={isOpen}
                    >
                        {content}
                    </Collapse>
                </Td>
            </Tr>
        </>
    )
}