import {
    TERMUE_ELEMENTS_PREFIX,
    TERMUE_NODE_PREFIX,
} from "./constants"

export type AddStringPrefix<
    T extends string,
    K extends string,
> = `${T}${K}`

type ExtractNodeName<
    T extends string,
> = AddStringPrefix<typeof TERMUE_NODE_PREFIX, T>

type ExtractElementName<
    T extends string,
> = AddStringPrefix<typeof TERMUE_ELEMENTS_PREFIX, T>

type ExtractTag<
    T extends string,
> = Capitalize<T>

export type ExtractNodeNames<
    T extends readonly string[]
> = ExtractNodeName<T[number]>

export type ExtractElementNames<
    T extends readonly string[]
> = ExtractElementName<T[number]>

export type ExtractTags<
    T extends readonly string[]
> = ExtractTag<T[number]>
