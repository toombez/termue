// TODO: rewrite utils for DRY and optimization

import { ForegroundColorName, foregroundColorNames } from 'chalk'
import { BorderColor, BorderSide, BorderStyle, Color, HexColor, RGBColor } from './values'
import { YogaNode } from '../dom'
import { BorderStyles, DisplayStyles, FlexStyles, MarginStyles, PaddingStyles, PositionStyles } from '.'
import Yoga, { Display, Edge, Overflow, PositionType } from 'yoga-layout'

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

function applyPositionToYogaEdge(position: number | undefined, edge: Edge, node: YogaNode) {
    if (position === undefined) {
        return
    }

    node.setPosition(edge, position)
}

export function applyPositionToYoga(styles: Partial<PositionStyles>, node: YogaNode) {
    const {
        position,
        aroundOffset,
        verticalOffset,
        horizontalOffset,
        topOffset,
        rightOffset,
        bottomOffset,
        leftOffset,
    } = styles

    const positionType = position === 'absolute'
        ? PositionType.Absolute
        : position === 'relative'
            ? PositionType.Relative
            : PositionType.Static

    if (position !== undefined) {
        node.setPositionType(positionType)
    }

    applyPositionToYogaEdge(aroundOffset, Yoga.EDGE_ALL, node)

    applyPositionToYogaEdge(verticalOffset, Yoga.EDGE_VERTICAL, node)
    applyPositionToYogaEdge(horizontalOffset, Yoga.EDGE_HORIZONTAL, node)

    applyPositionToYogaEdge(topOffset, Yoga.EDGE_TOP, node)
    applyPositionToYogaEdge(rightOffset, Yoga.EDGE_RIGHT, node)
    applyPositionToYogaEdge(bottomOffset, Yoga.EDGE_BOTTOM, node)
    applyPositionToYogaEdge(leftOffset, Yoga.EDGE_LEFT, node)
}

export function applyDisplayStyles(styles: Partial<DisplayStyles>, node: YogaNode) {
    const {
        display,
        overflow,
    } = styles

    const yogaDisplay = display === 'flex' ? Display.Flex : Display.None
    const yogaOverflow = overflow === 'visible'
        ? Overflow.Visible
        : overflow === 'scroll'
            ? Overflow.Scroll
            : Overflow.Hidden

    if (display !== undefined) {
        node.setDisplay(yogaDisplay)
    }

    if (overflow !== undefined) {
        node.setOverflow(yogaOverflow)
    }
}

export function applyFlexStyles(styles: Partial<FlexStyles>, node: YogaNode) {
    const {
        flexDirection,
        alignContent,
        alignItems,
        alignSelf,
        justifyContent,
        flex,
        flexBasis,
        flexGrow,
        flexShrink,
        flexWrap,
        gap,
        columnGap,
        rowGap,
    } = styles

    if (flex !== undefined) {
        node.setFlex(flex)
    }

    if (flexBasis !== undefined) {
        node.setFlexBasis(flexBasis)
    }

    if (flexGrow !== undefined) {
        node.setFlexGrow(flexGrow)
    }

    if (flexShrink !== undefined) {
        node.setFlexShrink(flexShrink)
    }

    if (gap !== undefined) {
        node.setGap(Yoga.GUTTER_ALL, gap)
    }

    if (columnGap !== undefined) {
        node.setGap(Yoga.GUTTER_COLUMN, columnGap)
    }

    if (rowGap !== undefined) {
        node.setGap(Yoga.GUTTER_ROW, rowGap)
    }

    if (flexDirection !== undefined) {
        const direction = flexDirection === 'column'
            ? Yoga.FLEX_DIRECTION_COLUMN
            : flexDirection === 'column-reverse'
                ? Yoga.FLEX_DIRECTION_COLUMN_REVERSE
                : flexDirection === 'row'
                    ? Yoga.FLEX_DIRECTION_ROW
                    : Yoga.FLEX_DIRECTION_ROW_REVERSE

        node.setFlexDirection(direction)
    }

    if (flexWrap !== undefined) {
        const wrap = flexWrap === 'wrap'
            ? Yoga.WRAP_WRAP
            : flexWrap === 'wrap-reverse'
                ? Yoga.WRAP_WRAP_REVERSE
                : Yoga.WRAP_NO_WRAP

        node.setFlexWrap(wrap)
    }

    if (alignContent !== undefined) {
        let align
        if (alignContent === 'baseline') {
            align = Yoga.ALIGN_BASELINE
        } else if (alignContent === 'center') {
            align = Yoga.ALIGN_CENTER
        } else if (alignContent === 'flex-around' || alignContent === 'space-around') {
            align = Yoga.ALIGN_SPACE_AROUND
        } else if (alignContent === 'flex-end') {
            align = Yoga.ALIGN_FLEX_END
        } else if (alignContent === 'flex-start') {
            align = Yoga.ALIGN_FLEX_START
        } else if (alignContent === 'space-between') {
            align = Yoga.ALIGN_SPACE_BETWEEN
        } else if (alignContent === 'space-evenly') {
            align = Yoga.ALIGN_SPACE_EVENLY
        } else {
            align = Yoga.ALIGN_STRETCH
        }

        node.setAlignContent(align)
    }

    if (alignItems !== undefined) {
        let align
        if (alignItems === 'baseline') {
            align = Yoga.ALIGN_BASELINE
        } else if (alignItems === 'center') {
            align = Yoga.ALIGN_CENTER
        } else if (alignItems === 'flex-around' || alignItems === 'space-around') {
            align = Yoga.ALIGN_SPACE_AROUND
        } else if (alignItems === 'flex-end') {
            align = Yoga.ALIGN_FLEX_END
        } else if (alignItems === 'flex-start') {
            align = Yoga.ALIGN_FLEX_START
        } else if (alignItems === 'space-between') {
            align = Yoga.ALIGN_SPACE_BETWEEN
        } else if (alignItems === 'space-evenly') {
            align = Yoga.ALIGN_SPACE_EVENLY
        } else {
            align = Yoga.ALIGN_STRETCH
        }

        node.setAlignItems(align)
    }

    if (alignSelf !== undefined) {
        let align
        if (alignSelf === 'baseline') {
            align = Yoga.ALIGN_BASELINE
        } else if (alignSelf === 'center') {
            align = Yoga.ALIGN_CENTER
        } else if (alignSelf === 'flex-around' || alignSelf === 'space-around') {
            align = Yoga.ALIGN_SPACE_AROUND
        } else if (alignSelf === 'flex-end') {
            align = Yoga.ALIGN_FLEX_END
        } else if (alignSelf === 'flex-start') {
            align = Yoga.ALIGN_FLEX_START
        } else if (alignSelf === 'space-between') {
            align = Yoga.ALIGN_SPACE_BETWEEN
        } else if (alignSelf === 'space-evenly') {
            align = Yoga.ALIGN_SPACE_EVENLY
        } else {
            align = Yoga.ALIGN_STRETCH
        }

        node.setAlignSelf(align)
    }

    if (justifyContent !== undefined) {
        let justify

        if (justifyContent === 'center') {
            justify = Yoga.JUSTIFY_CENTER
        } else if (justifyContent === 'flex-around' || justifyContent === 'space-around') {
            justify = Yoga.JUSTIFY_SPACE_AROUND
        } else if (justifyContent === 'flex-end') {
            justify = Yoga.JUSTIFY_FLEX_END
        } else if (justifyContent === 'flex-start') {
            justify = Yoga.JUSTIFY_FLEX_START
        } else if (justifyContent === 'space-between') {
            justify = Yoga.JUSTIFY_SPACE_BETWEEN
        } else {
            justify = Yoga.JUSTIFY_SPACE_EVENLY
        }

        node.setJustifyContent(justify)
    }
}

type ApplyStylesToYogaStyles = Partial<
    BorderStyles
    & MarginStyles
    & PaddingStyles
    & DisplayStyles
    & PositionStyles
    & FlexStyles
>

export function applyStylesToYoga(styles: ApplyStylesToYogaStyles, node: YogaNode) {
    applyPositionToYoga(styles, node)
    applyPaddingToYoga(styles, node)
    applyMarginToYoga(styles, node)
    applyFlexStyles(styles, node)

    applyDisplayStyles(styles, node)
    applyBorderStylesToYoga(styles, node)
}
