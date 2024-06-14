import { ForegroundColorName, foregroundColorNames } from 'chalk'
import { Color, HexColor, RGBColor } from './values'

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
