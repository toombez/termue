import { Boxes } from "cli-boxes"

export interface GeneralStyles {
    readonly width: number | string
    readonly height: number | string
    readonly maxWidth: number | string
    readonly maxHeight: number | string
    readonly minWidth: number | string
    readonly minHeight: number | string
    readonly aspectRatio: number

    readonly color: string
    readonly bgColor: string

    readonly padding: number | string
    readonly paddingY: number | string
    readonly paddingX: number | string
    readonly paddingTop: number | string
    readonly paddingRight: number | string
    readonly paddingBottom: number | string
    readonly paddingLeft: number | string

    readonly margin: number | string
    readonly marginY: number | string
    readonly marginX: number | string
    readonly marginTop: number | string
    readonly marginRight: number | string
    readonly marginBottom: number | string
    readonly marginLeft: number | string

    readonly position: 'relative' | 'static' | 'absolute'
    readonly horizontal: number | string
    readonly vecrical: number | string
    readonly top: number | string
    readonly right: number | string
    readonly bottom: number | string
    readonly left: number | string

    readonly display: 'flex' | 'none'
    readonly overflow: 'hidden' | 'scroll' | 'visible'

    readonly gap: number | string
    readonly rowGap: number | string
    readonly columnGap: number | string
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
    readonly flexBasis: number | string
    readonly flexGrow: number | string
    readonly flexShrink: number | string

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

    readonly borderTop: `${BoxStyles['borderColor']} ${BoxStyles['borderStyle']}`
    readonly borderRight: `${BoxStyles['borderColor']} ${BoxStyles['borderStyle']}`
    readonly borderBottom: `${BoxStyles['borderColor']} ${BoxStyles['borderStyle']}`
    readonly borderLeft: `${BoxStyles['borderColor']} ${BoxStyles['borderStyle']}`
}
