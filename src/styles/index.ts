import { BorderStyle } from "../render"
import type {
    AlignContent,
    AlignItems,
    AlignSelf,
    BorderSide,
    Color,
    DimensionValue,
    Display,
    FlexDirection,
    FlexWrap,
    JustifyContent,
    Overflow,
    Position
} from "./values"

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
    readonly color: Color
    readonly bgColor: Color
}

export interface TextStyles {
    readonly wrap: boolean
    readonly truncate: boolean
}

export interface BorderStyles {
    readonly borderStyle: BorderStyle
    readonly borderColor: Color
    readonly border: BorderSide
    readonly borderTop: BorderSide
    readonly borderRight: BorderSide
    readonly borderBottom: BorderSide
    readonly borderLeft: BorderSide
}
