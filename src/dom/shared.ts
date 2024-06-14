import type { Node, Config } from 'yoga-layout'

import {
    ColorStyles,
    DimensionStyles,
    DisplayStyles,
    FlexStyles,
    MarginStyles,
    PaddingStyles,
    PositionStyles,
    TextTransformStyles
} from "../styles"
import {
    TERMUE_ELEMENTS_NAMES,
    TERMUE_NODES_NAMES
} from './constants'
import {
    ExtractElementNames,
    ExtractNodeNames,
    ExtractTags
} from './utils'

export type GeneralElementStyles =
    FlexStyles
    & TextTransformStyles
    & ColorStyles
    & DimensionStyles
    & PaddingStyles
    & MarginStyles
    & DisplayStyles
    & PositionStyles

export type YogaNode = Node
export type YogaConfig = Config

export type TermueNodeName = ExtractNodeNames<typeof TERMUE_NODES_NAMES>
export type TermueElementName = ExtractElementNames<typeof TERMUE_ELEMENTS_NAMES>
export type Tag = ExtractTags<typeof TERMUE_ELEMENTS_NAMES>
