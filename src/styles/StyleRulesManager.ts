import StyleRule, { FindRuleByName, PickRawValue } from "./StyleRule"

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
        return this.rules.get(name)
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
}
