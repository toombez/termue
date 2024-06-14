import { AddStringPrefix } from "./utils"

const RAW_TERMUE_NODE_NAMES = [
    'text',
    'comment'
] as const

const RAW_TERMUE_ELEMENT_NAMES = [
    'text',
    'box',
    'root',
] as const

export const TERMUE_NODE_NAME: TERMUE_NODE_NAME_CONSTANT = {
    COMMENT: 'node:#comment',
    TEXT: 'node:#text',
} as const

export const TERMUE_ELEMENT_NAME: TERMUE_ELEMENT_NAME_CONSTANT = {
    BOX: 'element:box',
    ROOT: 'element:root',
    TEXT: 'element:text',
} as const

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
    [Name in Uppercase<Names>]: AddStringPrefix<
        Prefix,
        Lowercase<Name>
    >
}

type RawTermueNodeName = typeof RAW_TERMUE_NODE_NAMES[number]
type RawTermueElementName = typeof RAW_TERMUE_ELEMENT_NAMES[number]

type TERMUE_NODE_NAME_CONSTANT = GetNamesConstant<
    typeof TERMUE_NODE_PREFIX,
    RawTermueNodeName
>

type TERMUE_ELEMENT_NAME_CONSTANT = GetNamesConstant<
    typeof TERMUE_ELEMENT_PREFIX,
    RawTermueElementName
>
