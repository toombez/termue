import type {
    AddStringPrefix,
    CamelCaseToSnakeCase,
    GetStringArrayValues,
} from "../utilityTypes"
import { addStringPrefix, convertToConstant } from "../utils"

const RAW_TERMUE_NODE_NAMES = [
    'text',
    'comment',
] as const

const RAW_TERMUE_ELEMENT_NAMES = [
    'text',
    'box',
    'root',
] as const

// ============================================================================
// Internal logic
// ============================================================================

export type TermueNodeName = typeof TERMUE_NODE_NAME[
    Uppercase<RawTermueNodeName>
]

export type TermueElementName = typeof TERMUE_ELEMENT_NAME[
    Uppercase<RawTermueElementName>
]

export type TermueDOMName = TermueNodeName | TermueElementName

export const TERMUE_PREFIX_NAME_SEPARATOR = ':' as const

export const TERMUE_NODE_PREFIX =
    `node${TERMUE_PREFIX_NAME_SEPARATOR}#` as const

export const TERMUE_ELEMENT_PREFIX =
    `element${TERMUE_PREFIX_NAME_SEPARATOR}` as const

type GetNamesConstant<
    Prefix extends Readonly<string>,
    Names extends Readonly<string>,
> = {
    [Name in Uppercase<CamelCaseToSnakeCase<Names>>]: AddStringPrefix<
        Prefix,
        Lowercase<Name>
    >
}

export const TERMUE_NODE_NAME = RAW_TERMUE_NODE_NAMES
    .reduce((constants, value) => {
        const convertedKey = convertToConstant(value)
        const convertedValue = addStringPrefix(TERMUE_NODE_PREFIX, value)

        return {
            ...constants,
            [convertedKey]: convertedValue,
        }
    }, {}) as TERMUE_NODE_NAME_CONSTANT

export const TERMUE_ELEMENT_NAME = RAW_TERMUE_ELEMENT_NAMES
    .reduce((constants, value) => {
        const convertedKey = convertToConstant(value)
        const convertedValue = addStringPrefix(TERMUE_ELEMENT_PREFIX, value)

        return {
            ...constants,
            [convertedKey]: convertedValue,
        }
    }, {}) as TERMUE_ELEMENT_NAME_CONSTANT

type RawTermueNodeName = GetStringArrayValues<
    typeof RAW_TERMUE_NODE_NAMES
>

type RawTermueElementName = GetStringArrayValues<
    typeof RAW_TERMUE_ELEMENT_NAMES
>

type TERMUE_NODE_NAME_CONSTANT = GetNamesConstant<
    typeof TERMUE_NODE_PREFIX,
    RawTermueNodeName
>

type TERMUE_ELEMENT_NAME_CONSTANT = GetNamesConstant<
    typeof TERMUE_ELEMENT_PREFIX,
    RawTermueElementName
>
