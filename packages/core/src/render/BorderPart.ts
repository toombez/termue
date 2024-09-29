import cliBoxes, { BoxStyle, Boxes } from "cli-boxes"
import Part, { PartOptions, DEFAULT_PART_OPTIONS, TextTransformer } from "./Part"
import wrapAnsi from "wrap-ansi"

export type BorderPosition = keyof Pick<
    BoxStyle,
    'top' | 'right' | 'bottom' | 'left'
>

export type BorderStyle = keyof Boxes

type BorderSides = keyof BoxStyle

export type BorderPartOptions = {
    style: BorderStyle
} & PartOptions

const DEFAULT_BORDER_PART_OPTIONS: BorderPartOptions = {
    ...DEFAULT_PART_OPTIONS,
    style: 'classic',
} as const

export default class BorderPart extends Part {
    public constructor(
        position: BorderPosition,
        size: number,
        options: Partial<BorderPartOptions> = DEFAULT_BORDER_PART_OPTIONS,
    ) {
        const {
            style = DEFAULT_BORDER_PART_OPTIONS.style,
            ...rest
        } = options

        const borderText = BorderPart.generateBorderText(position, style, size)
        super(borderText, rest)
    }

    public static borderMapper = new Map<
        BorderPosition,
        [BorderSides, BorderSides, BorderSides]
    >([
        ['top', ['topLeft', 'top', 'topRight']],
        ['right', ['topRight', 'right', 'bottomRight']],
        ['bottom', ['bottomLeft', 'bottom', 'bottomRight']],
        ['left', ['topLeft', 'left', 'bottomLeft']],
    ])

    public static resizeTransformer(text: string, size: number): string {
        return text[0] + text[1].repeat(size - 2) + text[2]
    }

    public static makeVerticalTransformer(text: string): string {
        return wrapAnsi(text, 1, { hard: true })
        // return text.split('').join("\n")
    }

    public static isVertical(position: BorderPosition): boolean {
        return position === 'right' || position === 'left'
    }

    public static generateBorderText(
        position: BorderPosition,
        style: BorderStyle,
        size: number,
    ): string {
        const box = cliBoxes[style]
        const rawBorderText = BorderPart.borderMapper
            .get(position)!
            .map((side) => box[side])
            .join('')

        let borderText = BorderPart.resizeTransformer(rawBorderText, size)
        if (BorderPart.isVertical(position)) {
            borderText = BorderPart.makeVerticalTransformer(borderText)
        }

        return borderText
    }
}
