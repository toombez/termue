export const DOM_TYPE = {
    NODE: 0,
    ELEMENT: 1,
} as const

export type DomTypeName = keyof typeof DOM_TYPE
export type DomType = typeof DOM_TYPE[DomTypeName]

export const NODE_TYPE = {
    TEXT: '#text',
    COMMENT: '#comment',
} as const

export type NodeTypeName = keyof typeof NODE_TYPE
export type NodeType = typeof NODE_TYPE[NodeTypeName]

export const ELEMENT_TAG = {
    BOX: '$box',
    TEXT: '$text',
    BUTTON: '$button',
    INPUT: '$input',
    LINK: '$link',
} as const

export type ElementTagName = keyof typeof ELEMENT_TAG
export type ElementTag = typeof ELEMENT_TAG[ElementTagName]
