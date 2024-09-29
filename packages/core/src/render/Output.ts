import sliceAnsi from "slice-ansi"
import stringWidth from "string-width"
import Part from "./Part"

export default class Output {
    private readonly parts: Part[] = []
    private readonly resultLines: string[]

    public constructor(
        public readonly width: number,
        public readonly height: number,
    ) {
        this.resultLines = Output.generateEmptyLines(width, height)
    }

    public addParts(...parts: Part[]): Output {
        this.parts.push(...parts)

        return this
    }

    public compose() {
        this.parts.forEach((part) => { part
            .applyTransformers()
            .text
            .split('\n').forEach((line, lineIndex) => {
                const y = part.y + lineIndex
                const resultLine = this.resultLines[y]

                if (!resultLine) {
                    return
                }

                const x = part.x
                const allowedWidth = this.width - x
                const width = Math.min(allowedWidth, stringWidth(line))

                const left = sliceAnsi(resultLine, 0, x)
                const middle = sliceAnsi(line, 0, width)
                const right = sliceAnsi(resultLine, x + width, this.width)

                this.resultLines[y] = left + middle + right
            })
        })

        return this
    }

    public get result(): string {
        return this.resultLines.join("\n")
    }

    private static generateEmptyLines(width: number, height: number): string[] {
        return Array
            .from({ length: height })
            .map(() => " ".repeat(width))
    }
}
