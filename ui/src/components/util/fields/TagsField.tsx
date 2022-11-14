import {useReadTagQuery} from "../../../redux/generated/redux-api";
import {FieldProps} from "./types";
import {useMemo} from "react";
import {Controller} from "react-hook-form";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tag,
    TagCloseButton,
    TagLabel
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

interface TagsFormComponentProps {
    onChange: (value: string[]) => void,
    onBlur: () => void,
    value: string[],
    label: string,
}

const TagsFormComponent = (props: TagsFormComponentProps) => {
    const {value = [], onChange, onBlur, label} = props

    const {data: tags = []} = useReadTagQuery()

    const availableTags = useMemo(() => {
        return tags
            .filter((tag) => !value.includes(tag?.id || ''))
            .sort((a, b) => a.name?.localeCompare(b.name || '') || 0)
    }, [tags, value])

    return (
        <FormControl
            onBlur={onBlur}
            mt={4}
        >
            <FormLabel>{label}</FormLabel>
            <Flex
                flexWrap={"wrap"}
                gap={2}
                my={2}
            >
                {value.map((tag, index) => (
                    <Tag
                        size={'md'}
                        key={`form_selected_tag_${index}`}
                        borderRadius='full'
                        variant='solid'
                        colorScheme='green'
                    >
                        <TagLabel>{tags.find(t => t.id === tag)?.name?.toUpperCase()}</TagLabel>
                        <TagCloseButton
                            onClick={() => {
                                onChange(value.filter(t => t !== tag))
                            }}
                        />
                    </Tag>
                ))}
            </Flex>
            <Menu>
                <MenuButton
                    as={Button}
                    leftIcon={<AddIcon/>}
                    disabled={availableTags.length === 0}
                >
                    Add tag
                </MenuButton>
                <MenuList>
                    {availableTags.map((tag, index) => (
                        <MenuItem
                            key={`form_filed_tag_${index}`}
                            onClick={() => {
                                onChange([...value, tag.id || ''])
                            }}
                        >
                            {tag.name?.toUpperCase()}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </FormControl>
    )
}

export const TagsField = (props: FieldProps) => {
    const {control, name, label} = props

    return (
        <Controller
            name={name || "tags"}
            control={control}
            render={({field}) => {
                const {value, onBlur, onChange} = field
                return (
                    <TagsFormComponent
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        label={label || 'Tags'}
                    />
                )
            }}
        />
    )
}