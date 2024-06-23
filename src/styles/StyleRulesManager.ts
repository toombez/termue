import StyleRule, { FindRuleByName, PickRawValue, PickRuleResultToRecord } from "./StyleRule"

export default class StyleRulesManager<Rules extends StyleRule> {
    public readonly rules: Map<Rules['name'], Rules> = new Map()

    public constructor(...rules: Rules[]) {
        rules.forEach(this.addRule.bind(this))
    }

    public addRule(rule: Rules): typeof this {
        this.rules.set(rule.name, rule)
        return this
    }

    public setRuleValue<Name extends Rules['name']>(
        name: Name,
        value: PickRawValue<FindRuleByName<Rules, Name>>
    ): typeof this {
        if (this.hasRule(name)) {
            this.rules.get(name)!.value = value
        }

        return this
    }

    public getRuleValue<Name extends Rules['name']>(
        name: Name
    ): FindRuleByName<Rules, Name>['value'] | undefined {
        return this.rules.get(name)?.value
    }

    public removeRule<Name extends Rules['name']>(name: Name): typeof this {
        this.rules.delete(name)
        return this
    }

    public hasRule<Name extends Rules['name']>(name: Name) {
        return this.rules.has(name)
    }

    public get size(): number {
        return this.rules.size
    }

    public computeStyles(styles: Record<string, unknown>): Partial<PickRuleResultToRecord<Rules>> {
        const result: Record<string, unknown> = {}

        for (let ruleName in styles) {
            const rawValue = styles[ruleName]

            if (!this.hasRule(ruleName)) {
                continue
            }

            this.setRuleValue(ruleName, rawValue as any)
            const value = this.getRuleValue(ruleName)

            result[ruleName] = value
        }

        return result as Partial<PickRuleResultToRecord<Rules>>
    }
}
