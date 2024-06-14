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

export interface FlexStyles {
    readonly overflow: Overflow
    readonly display: Display
    readonly gap: DimensionValue
    readonly rowGap: DimensionValue
    readonly columnGap: DimensionValue
    readonly justifyContent: JustifyContent
    readonly alignItems: AlignItems
    readonly alignContent: AlignContent
    readonly alignSelf: AlignSelf
    readonly flexDirection: FlexDirection
    readonly flexWrap: FlexWrap
    readonly flex: number
    readonly flexBasis: DimensionValue
    readonly flexGrow: DimensionValue
    readonly flexShrink: DimensionValue
}

export type Position =
    'relative'
    | 'static'
    | 'absolute'

export type Overflow =
    'hidden'
    | 'scroll'
    | 'visible'

export interface DimensionStyles {
    readonly width: DimensionValue
    readonly height: DimensionValue
    readonly maxWidth: DimensionValue
    readonly maxHeight: DimensionValue
    readonly minWidth: DimensionValue
    readonly minHeight: DimensionValue
    readonly aspectRatio: number

    readonly padding: DimensionValue
    readonly paddingY: DimensionValue
    readonly paddingX: DimensionValue
    readonly paddingTop: DimensionValue
    readonly paddingRight: DimensionValue
    readonly paddingBottom: DimensionValue
    readonly paddingLeft: DimensionValue

    readonly margin: DimensionValue
    readonly marginY: DimensionValue
    readonly marginX: DimensionValue
    readonly marginTop: DimensionValue
    readonly marginRight: DimensionValue
    readonly marginBottom: DimensionValue
    readonly marginLeft: DimensionValue

    readonly position: Position
    readonly horizontal: DimensionValue
    readonly vecrical: DimensionValue
    readonly top: DimensionValue
    readonly right: DimensionValue
    readonly bottom: DimensionValue
    readonly left: DimensionValue
}

export interface TextTransformStyles {
    readonly underline: boolean
    readonly overline: boolean
    readonly italic: boolean
    readonly bold: boolean
    readonly strikethrough: boolean
    readonly dim: boolean
}

export interface ColorStyles {
    readonly color: string
    readonly bgColor: string
}

export interface TextStyles {
    readonly wrap: boolean
    readonly truncate: boolean
}

export type BorderStyle = keyof Boxes

export type BorderSide = `${BorderStyle} ${string}`

export interface BorderStyles {
    readonly borderStyle: BorderStyle
    readonly borderColor: string
    readonly border: BorderSide
    readonly borderTop: BorderSide
    readonly borderRight: BorderSide
    readonly borderBottom: BorderSide
    readonly borderLeft: BorderSide
}
