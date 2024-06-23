import { ForegroundColorName, colors, foregroundColorNames } from "chalk"
import StyleRule from "../StyleRule"

type ColorRGBObjectValue = {
    red: number
    green: number
    blue: number
}
type ColorRGBArrayValue = [number, number, number]
type ColorHEXValue = `#${string}`
type ColorNamedValue = ForegroundColorName

type ColorStyleRuleRawValue =
    ColorRGBObjectValue
    | ColorRGBArrayValue
    | ColorHEXValue
    | ColorNamedValue

type ColorStyleRuleResultValue = ColorNamedValue | ColorHEXValue

export default abstract class ColorStyleRule extends StyleRule<
    ColorStyleRuleRawValue,
    ColorStyleRuleResultValue
> {
    protected parseInternal(value: ColorStyleRuleResultValue): ColorStyleRuleResultValue {
        return value
    }

    protected parseRaw(value: ColorStyleRuleRawValue): ColorStyleRuleResultValue {
        if (ColorStyleRule.isHEXColor(value)) {
            return value
        }

        if (
            ColorStyleRule.isRGBArrayColor(value)
            || ColorStyleRule.isRGBObjectColor(value)
        ) {
            return ColorStyleRule.RGBToHex(value)
        }

        return value
    }

    protected assertValue(value: ColorStyleRuleRawValue): asserts value is ColorStyleRuleRawValue {
        if (!ColorStyleRule.isHEXColor(value)
            && !ColorStyleRule.isNamedColor(value)
            && ! ColorStyleRule.isRGBArrayColor(value)
            && !ColorStyleRule.isRGBObjectColor(value)
        ) {
            throw new Error(`Unknown color value: "${value}"`)
        }
    }

    public static isHEXColor(color: ColorStyleRuleRawValue): color is ColorHEXValue {
        return typeof color === 'string' && (color.length === 4 || color.length === 7)
    }

    public static isRGBArrayColor(color: ColorStyleRuleRawValue): color is ColorRGBArrayValue {
        return Array.isArray(color) && color.length === 3
    }

    public static isRGBObjectColor(color: ColorStyleRuleRawValue): color is ColorRGBObjectValue {
        return typeof color === 'object' && 'red' in color && 'green' in color && 'blue' in color
    }

    public static isNamedColor(color: ColorStyleRuleRawValue): color is ColorNamedValue {
        return typeof color === 'string' && foregroundColorNames.includes(color as ForegroundColorName)
    }

    public static HEXToObjectRGB(hex: ColorHEXValue): ColorRGBObjectValue {
        const isShortHex = hex.length === 4

        const hexRed = isShortHex ? hex.slice(1, 2).repeat(2) : hex.slice(1, 3)
        const hexGreen = isShortHex ? hex.slice(2, 3).repeat(2) : hex.slice(3, 5)
        const hexBlue = isShortHex ? hex.slice(3, 4).repeat(2) : hex.slice(5, 7)

        const red = parseInt(hexRed, 16)
        const green = parseInt(hexGreen, 16)
        const blue = parseInt(hexBlue, 16)

        return { red, green, blue };
    }

    public static RGBArrayToRGBObject(color: ColorRGBArrayValue): ColorRGBObjectValue {
        const [red, green, blue] = color
        return { red, green, blue }
    }

    public static RGBObjectToHEX(color: ColorRGBObjectValue): ColorHEXValue {
        const redHEX = this.colorComponentToHEX(color.red)
        const greenHEX = this.colorComponentToHEX(color.green)
        const blueHEX = this.colorComponentToHEX(color.blue)

        return ("#" + redHEX + greenHEX + blueHEX) as ColorHEXValue
    }

    public static RGBToHex(color: ColorRGBArrayValue | ColorRGBObjectValue): ColorHEXValue {
        let rgb = Array.isArray(color)
            ? this.RGBArrayToRGBObject(color)
            : color

        return this.RGBObjectToHEX(rgb)
    }

    protected static colorComponentToHEX(c: number) {
        const hex = c.toString(16)
        return hex.length == 1 ? "0" + hex : hex
    }
}
