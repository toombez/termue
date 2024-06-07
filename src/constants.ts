export const TERMUE_NODES_NAMES = [
    'text',
    'comment',
] as const

export const TERMUE_ELEMENTS_NAMES = [
    'box',
    'text',
    'root',
] as const

export const TERMUE_PREFIX_NAME_SEPARATOR = ':' as const

export const TERMUE_NODE_PREFIX = `node${TERMUE_PREFIX_NAME_SEPARATOR}#` as const

export const TERMUE_ELEMENTS_PREFIX = `element${TERMUE_PREFIX_NAME_SEPARATOR}` as const
