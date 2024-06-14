import { Boxes } from "cli-boxes"

export type DimensionValue = number

export interface GeneralStyles {
    readonly width: DimensionValue
    readonly height: DimensionValue
    readonly maxWidth: DimensionValue
    readonly maxHeight: DimensionValue
    readonly minWidth: DimensionValue
    readonly minHeight: DimensionValue
    readonly aspectRatio: number

    readonly color: string
    readonly bgColor: string

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

    readonly position: 'relative' | 'static' | 'absolute'
    readonly horizontal: DimensionValue
    readonly vecrical: DimensionValue
    readonly top: DimensionValue
    readonly right: DimensionValue
    readonly bottom: DimensionValue
    readonly left: DimensionValue

    readonly display: 'flex' | 'none'
    readonly overflow: 'hidden' | 'scroll' | 'visible'

    readonly gap: DimensionValue
    readonly rowGap: DimensionValue
    readonly columnGap: DimensionValue
    readonly justifyContent:
        'center'
        | 'flex-end'
        | 'flex-start'
        | 'flex-around'
        | 'space-around'
        | 'space-between'
        | 'space-evenly'
    readonly alignItems:
        'baseline'
        | 'center'
        | 'flex-end'
        | 'flex-start'
        | 'space-around'
        | 'space-between'
        | 'space-evenly'
        | 'stretch'
    readonly alignContent: GeneralStyles['alignItems']
    readonly alignSelf: GeneralStyles['alignItems']
    readonly flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse'
    readonly flexWrap: 'wrap' | 'no-wrap' | 'wrap-reverse'
    readonly flex: number
    readonly flexBasis: DimensionValue
    readonly flexGrow: DimensionValue
    readonly flexShrink: DimensionValue

    readonly underline: boolean
    readonly overline: boolean
    readonly italic: boolean
    readonly bold: boolean
    readonly strikethrough: boolean
    readonly dim: boolean
}

export interface TextStyles extends GeneralStyles {
    readonly wrap: boolean
    readonly truncate: boolean
}

export interface BoxStyles extends GeneralStyles {
    readonly borderStyle: keyof Boxes
    readonly borderColor: string
    readonly border: `${BoxStyles['borderColor']} ${BoxStyles['borderStyle']}`

    readonly borderTop: `${BoxStyles['borderColor']} ${BoxStyles['borderStyle']}`
    readonly borderRight: `${BoxStyles['borderColor']} ${BoxStyles['borderStyle']}`
    readonly borderBottom: `${BoxStyles['borderColor']} ${BoxStyles['borderStyle']}`
    readonly borderLeft: `${BoxStyles['borderColor']} ${BoxStyles['borderStyle']}`
}
