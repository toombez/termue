import sliceAnsi from "slice-ansi"
import stringWidth from "string-width"

export class Part {
    public constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly text: string,
    ) {}

    public get lines() {
        return this.text.split("\n")
    }
}

export class Output {
    private readonly parts: Part[] = []
    private readonly resultLines: string[]

    public constructor(
        public readonly width: number,
        public readonly height: number,
    ) {
        this.resultLines = Output.generateEmptyLines(width, height)
    }

    public addParts(...part: Part[]): Output {
        this.parts.push(...part)

        return this
    }

    public compose(): Output {
        this.parts.forEach(this.composePart.bind(this))

        return this
    }

    private composePart(part: Part) {
        part.lines.forEach((line, lineIndex) => {
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
