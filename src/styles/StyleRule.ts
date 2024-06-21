export default abstract class StyleRule<
    RawValue = unknown,
    ResultValue = RawValue,
    InternalValue = ResultValue,
> {
    protected internalValue: InternalValue | undefined
    protected abstract parseInternal(value: InternalValue): ResultValue

    public abstract readonly name: string

    public abstract parseRaw(value: RawValue): InternalValue
    public abstract assertValue(value: RawValue): asserts value is RawValue

    public constructor(value: RawValue | undefined = undefined) {
        this.value = value
    }

    public get value(): ResultValue | undefined {
        if (typeof this.internalValue === 'undefined') {
            return this.internalValue
        }

        return this.parseInternal(this.internalValue)
    }

    public set value(value: RawValue | undefined) {
        if (typeof value === 'undefined') {
            this.clear()
            return
        }

        this.assertValue(value)
        this.internalValue = this.parseRaw(value)
    }

    public clear(): void {
        this.internalValue = undefined
    }

    public isHaveValue(): this is {
        set value(value: RawValue | undefined)
        get value(): ResultValue
    } {
        return typeof this.internalValue !== 'undefined'
    }
}
