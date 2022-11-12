import {Amount} from "../../../redux/generated/redux-api";
import {Collapse, Fade, IconButton, Td, Text, Tr} from "@chakra-ui/react";
import {AmountTableCell} from "./AmountTableCell";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {Fragment} from "react";

interface Props {
    name: string,
    amount?: Amount | number,
    isOpen: boolean,
    onOpenToggle: () => void,
    content: JSX.Element,
    isLast?: boolean
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
    const {name, amount, content, isOpen, onOpenToggle, isLast} = props

    return (
        <Fragment>
            <Tr>
                <Td
                    whiteSpace={"break-spaces"}
                    borderWidth={isLast ? 0 : undefined}
                >
                    <Fade in={!isOpen}>
                        <Text>
                            {name}
                        </Text>
                    </Fade>
                </Td>
                {amount &&
                    <Td
                        isNumeric
                        borderWidth={isLast ? 0 : undefined}
                    >
                        <Fade in={!isOpen}>
                            <AnyAmountComponent amount={amount}/>
                        </Fade>
                    </Td>
                }
                <Td
                    isNumeric
                    p={0}
                    pr={2}
                    borderWidth={isLast ? 0 : undefined}
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
                    borderWidth={0}
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