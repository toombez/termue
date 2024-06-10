export type TextTransformer = (text: string) => string

export type PartOptions = {
    x: number,
    y: number,
    transformers: TextTransformer[]
}

export const DEFAULT_PART_OPTIONS: PartOptions = {
    transformers: [],
    x: 0,
    y: 0,
} as const

export default class Part {
    protected readonly transformers: PartOptions['transformers']
    public readonly x: PartOptions['x']
    public readonly y: PartOptions['y']

    public constructor(
        protected _text: string,
        options: Partial<PartOptions> = DEFAULT_PART_OPTIONS,
    ) {
        const {
            transformers = DEFAULT_PART_OPTIONS.transformers,
            x = DEFAULT_PART_OPTIONS.x,
            y = DEFAULT_PART_OPTIONS.y,
        } = options

        this.transformers = transformers
        this.x = x
        this.y = y
    }

    public addTransformers(...transformers: TextTransformer[]): typeof this {
        this.transformers.push(...transformers)

        return this
    }

    public get transformedText(): string {
        return this.transformers
            .reduce(
                (text, transformer) => transformer(text),
                this.text
            )
    }

    public get text(): string {
        return this._text
    }

    public applyTransformers(): Part {
        return new Part(this.transformedText, {
            x: this.x,
            y: this.y,
        })
    }
}
