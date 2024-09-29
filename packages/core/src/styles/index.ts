import { BorderStyle } from "../render"
import type {
    AlignContent,
    AlignItems,
    AlignSelf,
    BorderColor,
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

export interface DisplayStyles {
    readonly overflow: Overflow
    readonly display: Display
}

export interface FlexStyles {
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

export interface PaddingStyles {
    readonly padding: DimensionValue
    readonly paddingVertical: DimensionValue
    readonly paddingHorizontal: DimensionValue
    readonly paddingTop: DimensionValue
    readonly paddingRight: DimensionValue
    readonly paddingBottom: DimensionValue
    readonly paddingLeft: DimensionValue
}

export interface MarginStyles {
    readonly margin: DimensionValue
    readonly marginVertical: DimensionValue
    readonly marginHorizontal: DimensionValue
    readonly marginTop: DimensionValue
    readonly marginRight: DimensionValue
    readonly marginBottom: DimensionValue
    readonly marginLeft: DimensionValue
}

export interface PositionStyles {
    readonly position: Position
    readonly aroundOffset: DimensionValue
    readonly horizontalOffset: DimensionValue
    readonly verticalOffset: DimensionValue
    readonly topOffset: DimensionValue
    readonly rightOffset: DimensionValue
    readonly bottomOffset: DimensionValue
    readonly leftOffset: DimensionValue
}

export interface DimensionStyles {
    readonly width: DimensionValue
    readonly height: DimensionValue
    readonly maxWidth: DimensionValue
    readonly maxHeight: DimensionValue
    readonly minWidth: DimensionValue
    readonly minHeight: DimensionValue
    readonly aspectRatio: number
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
    readonly backgroundColor: Color
}

export interface TextStyles {
    readonly wrap: boolean
    readonly truncate: boolean
}

export interface BorderStyles {
    readonly borderStyle: BorderStyle
    readonly borderColor: BorderColor
    readonly border: BorderSide
    readonly borderHorizontal: BorderSide
    readonly borderVertical: BorderSide
    readonly borderTop: BorderSide
    readonly borderRight: BorderSide
    readonly borderBottom: BorderSide
    readonly borderLeft: BorderSide
}

export * from './values'
export * from './utils'
