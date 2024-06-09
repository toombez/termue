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
        private readonly wrapOnOverflow: boolean = true
    ) {
        this.resultLines = Output.generateEmptyLines(width, height)
    }

    public addPart(part: Part): Output {
        this.parts.push(part)

        return this
    }

    public compose(): Output {
        this.parts
            .map((part) => {
                part.lines.map((line, lineIndex) => {
                    const y = part.y + lineIndex

                    const resultLine = this.resultLines[y]

                    if (!resultLine) {
                        return
                    }

                    const x = part.x
                    const allowedWidth = resultLine.length - x
                    const width = Math.min(allowedWidth, line.length)

                    const left = resultLine.slice(0, x)
                    const middle = line.slice(0, width)
                    const right = resultLine.slice(x + width, this.width)

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
