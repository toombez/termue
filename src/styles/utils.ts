import { ForegroundColorName, foregroundColorNames } from 'chalk'
import { BorderColor, BorderSide, BorderStyle, Color, HexColor, RGBColor } from './values'
import { YogaNode } from '../dom'
import { BorderStyles, MarginStyles, PaddingStyles } from '.'
import Yoga, { Edge } from 'yoga-layout'

export function isHexColor(color: Color): color is HexColor {
    if (typeof color !== 'string') {
        return false
    }

    if (color.startsWith('#')) {
        return false
    }

    const colorValues = color.slice(1)

    if (colorValues.length !== 3 && colorValues.length !== 6) {
        return false
    }

    return true
}

export function isRGBColor(color: Color): color is RGBColor {
    if (typeof color !== 'object') {
        return false
    }

    if (color.length !== 3) {
        return false
    }

    return true
}

export function isChalkColor(color: Color): color is ForegroundColorName {
    if (typeof color !== 'string') {
        return false
    }

    if (color.startsWith('#')) {
        return false
    }

    return foregroundColorNames.includes(color as ForegroundColorName)
}

type ParseBorderSideOutput = {
    color: BorderColor,
    style: BorderStyle,
} | 0

export function parseBorderSide(border: BorderSide): ParseBorderSideOutput {
    if (typeof border === 'number') {
        return 0
    }

    const splittedBorder = border.split(" ")

    return {
        style: splittedBorder[0] as BorderStyle,
        color: splittedBorder[1] as BorderColor,
    }
}

function applyBorderSideToYoga(
    border: BorderSide | undefined,
    edge: Edge,
    node: YogaNode
) {
    if (border === undefined) {
        return
    }

    const isZeroBorder = typeof border === 'number' && border === 0
    const borderWidth = isZeroBorder ? 0 : 1

    node.setBorder(edge, borderWidth)
}

export function applyBorderStylesToYoga(styles: Partial<BorderStyles>, node: YogaNode) {
    const {
        border,
        borderVertical,
        borderHorizontal,
        borderBottom,
        borderLeft,
        borderRight,
        borderTop,
    } = styles

    applyBorderSideToYoga(border, Yoga.EDGE_ALL, node)
    applyBorderSideToYoga(borderVertical, Yoga.EDGE_VERTICAL, node)
    applyBorderSideToYoga(borderHorizontal, Yoga.EDGE_HORIZONTAL, node)
    applyBorderSideToYoga(borderTop, Yoga.EDGE_TOP, node)
    applyBorderSideToYoga(borderRight, Yoga.EDGE_RIGHT, node)
    applyBorderSideToYoga(borderBottom, Yoga.EDGE_BOTTOM, node)
    applyBorderSideToYoga(borderLeft, Yoga.EDGE_LEFT, node)
}

function applyPaddingToYogaEdge(padding: number | undefined, edge: Edge, node: YogaNode) {
    if (padding === undefined) {
        return
    }

    node.setPadding(edge, padding)
}

export function applyPaddingToYoga(styles: Partial<PaddingStyles>, node: YogaNode) {
    const {
        padding,
        paddingVertical,
        paddingHorizontal,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
    } = styles

    applyPaddingToYogaEdge(padding, Yoga.EDGE_ALL, node)

    applyPaddingToYogaEdge(paddingVertical, Yoga.EDGE_VERTICAL, node)
    applyPaddingToYogaEdge(paddingHorizontal, Yoga.EDGE_HORIZONTAL, node)

    applyPaddingToYogaEdge(paddingTop, Yoga.EDGE_TOP, node)
    applyPaddingToYogaEdge(paddingRight, Yoga.EDGE_RIGHT, node)
    applyPaddingToYogaEdge(paddingBottom, Yoga.EDGE_BOTTOM, node)
    applyPaddingToYogaEdge(paddingLeft, Yoga.EDGE_LEFT, node)
}

function applyMarginToYogaEdge(margin: number | undefined, edge: Edge, node: YogaNode) {
    if (margin === undefined) {
        return
    }

    node.setMargin(edge, margin)
}

export function applyMarginToYoga(styles: Partial<MarginStyles>, node: YogaNode) {
    const {
        margin,
        marginVertical,
        marginHorizontal,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
    } = styles

    applyMarginToYogaEdge(margin, Yoga.EDGE_ALL, node)

    applyMarginToYogaEdge(marginVertical, Yoga.EDGE_VERTICAL, node)
    applyMarginToYogaEdge(marginHorizontal, Yoga.EDGE_HORIZONTAL, node)

    applyMarginToYogaEdge(marginTop, Yoga.EDGE_TOP, node)
    applyMarginToYogaEdge(marginRight, Yoga.EDGE_RIGHT, node)
    applyMarginToYogaEdge(marginBottom, Yoga.EDGE_BOTTOM, node)
    applyMarginToYogaEdge(marginLeft, Yoga.EDGE_LEFT, node)
}

type ApplyStylesToYogaStyles = Partial<
    BorderStyles
    & MarginStyles
    & PaddingStyles
>

export function applyStylesToYoga(styles: ApplyStylesToYogaStyles, node: YogaNode) {
    applyPaddingToYoga(styles, node)
    applyMarginToYoga(styles, node)

    applyBorderStylesToYoga(styles, node)
}
