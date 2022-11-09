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
    const {name, amount, content, isOpen, onOpenToggle} = props


    return (
        <Fragment>
            <Tr maxW={"100vw"}>
                <Td whiteSpace={"break-spaces"}>
                    <Fade in={!isOpen}>
                        <Text>
                            {name}
                        </Text>
                    </Fade>
                </Td>
                {amount &&
                    <Td isNumeric>
                        <Fade in={!isOpen}>
                            <AnyAmountComponent amount={amount}/>
                        </Fade>
                    </Td>
                }
                <Td
                    isNumeric
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
            <Tr maxW={"100vw"}>
                <Td
                    py={0}
                    colSpan={3}
                    whiteSpace={"break-spaces"}
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