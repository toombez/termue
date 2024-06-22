import { UnionToIntersection } from "../utilityTypes"
import StyleRule, { PickRuleResultToRecord } from "./StyleRule"

export default abstract class CompositeStyleRule<
    Rules extends StyleRule | CompositeStyleRule = StyleRule,
    Raw = unknown
> extends StyleRule<
    Raw,
    RuleResult<Rules>,
    CompositeRuleInternal<Rules>
> {
    protected abstract internalValue: CompositeRuleInternal<Rules>

    protected parseInternal(
        value: CompositeRuleInternal<Rules>
    ): RuleResult<Rules> {
        return Object
            .entries(value)
            .reduce((result,[_, rule]) => this
                .addRuleToStyles(result, rule as StyleRule),
            {}) as RuleResult<Rules>
    }

    private addRuleToStyles(styles: Record<string, unknown>, rule: StyleRule) {
        if (!rule.isHaveValue()) {
            return styles
        }

        const isCompositeRule = rule instanceof CompositeStyleRule
        const value = rule.value

        if (isCompositeRule) {
            return {
                ...styles,
                ...value!,
            }
        }

        return {
            ...styles,
            [rule.name]: value,
        }
    }
}

export type CompositeRuleInternal<R extends StyleRule> = {
    [K in R as K['name']]: K
}

export type RuleResult<
    R extends StyleRule | CompositeStyleRule
> = UnionToIntersection<
    R extends CompositeStyleRule<infer I>
        ? I extends CompositeStyleRule
            ? I['value']
            : PickRuleResultToRecord<I>
        : PickRuleResultToRecord<R>
>
