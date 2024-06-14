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
import TermueDOMNode from './nodes/TermueDOMNode'
import TermueCommentDOMNode from './nodes/TermueCommentDOMNode'
import TermueTextDOMNode from './nodes/TermueTextDOMNode'
import TermueDOMElement from './elements/TermueDOMElement'
import TermueBoxDOMElement from './elements/TermueBoxDOMElement'
import TermueTextDOMElement from './elements/TermueTextDOMElement'
import TermueRootDOMElement from './elements/TermueRootDOMElement'

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

export type DOMNode =
    TermueDOMNode
    | TermueCommentDOMNode
    | TermueTextDOMNode

export type DOMElement =
    TermueDOMElement
    | TermueBoxDOMElement
    | TermueTextDOMElement
    | TermueRootDOMElement
