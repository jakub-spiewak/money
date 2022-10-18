import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {ReactElement, useEffect, useState} from "react";
import {AmountType} from "../../../../redux/generated/redux-api";
import {FiCode} from "react-icons/fi";
import {AiOutlinePercentage, AiOutlineQuestion} from "react-icons/ai";
import {GiMoai} from "react-icons/gi";

const supportedAmountTypes: AmountType[]  = ["CONSTANT", "RANGE", "PERCENTAGE"]

const icons: Record<AmountType, ReactElement> = {
    "CONSTANT": <GiMoai/>,
    "RANGE": <FiCode/>,
    "PERCENTAGE": <AiOutlinePercentage/>,
    "UNKNOWN": <AiOutlineQuestion/>
}

const names: Record<AmountType, string> = {
    "CONSTANT": "Constant",
    "RANGE": "Range",
    "PERCENTAGE": "Percentage",
    "UNKNOWN": "Unknown",
}

interface Props {
    value?: AmountType,
    onChange?: (value: AmountType) => void,
    onBlur?: () => void
}


export const AmountTypeSelect = (props: Props) => {
    const {value, onBlur, onChange} = props

    const [type, setType] = useState<AmountType>(value || "CONSTANT")

    useEffect(() => {
        onChange?.(type)
    }, [type, onChange])

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label={"Options"}
                icon={icons[value || type]}
                onBlur={onBlur}
            />
            <MenuList>
                {
                    supportedAmountTypes.map((t, index) => (
                        <MenuItem
                            key={`amount_type_option_${index}`}
                            isDisabled={t === type}
                            icon={icons[t]}
                            onClick={() => setType(t)}
                        >
                            {names[t]}
                        </MenuItem>
                    ))
                }
            </MenuList>
        </Menu>
    )
}