import { ForegroundColorName } from "chalk"
import { Boxes } from "cli-boxes"

export type DimensionValue = number

export type Display =
    'flex'
    | 'none'

export type JustifyContent =
    'center'
    | 'flex-end'
    | 'flex-start'
    | 'flex-around'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'

export type AlignItems =
    JustifyContent
    | 'baseline'
    | 'stretch'

export type AlignSelf = AlignItems

export type AlignContent = AlignItems

export type FlexDirection =
    'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'

export type FlexWrap =
    'wrap'
    | 'no-wrap'
    | 'wrap-reverse'

export type Position =
    'relative'
    | 'static'
    | 'absolute'

export type Overflow =
    'hidden'
    | 'scroll'
    | 'visible'

export type BorderStyle = keyof Boxes

export type BorderSide = `${BorderStyle} ${string}`

export type HexColor = `#${string}`

export type RGBColor = [number, number, number]

export type Color = HexColor | RGBColor | ForegroundColorName

export type BackgroundColor = Color

export type TextColor = Color

export type BorderColor = Color
