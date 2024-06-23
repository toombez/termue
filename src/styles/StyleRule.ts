export default abstract class StyleRule<
    RawValue = unknown,
    ResultValue = RawValue,
    InternalValue = ResultValue,
> {
    public abstract readonly name: string

    protected abstract parseInternal(value: InternalValue): ResultValue
    protected abstract parseRaw(value: RawValue): InternalValue
    protected abstract assertValue(value: RawValue): asserts value is RawValue

    protected internalValue: InternalValue | undefined

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

export type PickRuleResult<R extends StyleRule> = R['value']

export type PickRuleResultToRecord<R extends StyleRule> = {
    [K in R as K['name']]: PickRuleResult<K>
}

export type PickInternalValue<
    Rule extends StyleRule
> = Rule extends StyleRule<infer _, infer __, infer I> ? I : never

export type PickRawValue<
    Rule extends StyleRule
> = Rule extends StyleRule<infer R, infer _, infer __> ? R : never

export type PickResultValue<
    Rule extends StyleRule
> = Rule extends StyleRule<infer _, infer R, infer __> ? R : never

export type FindRuleByName<Rules extends StyleRule, Name extends Rules['name']> =
    Extract<Rules, { name: Name }>
