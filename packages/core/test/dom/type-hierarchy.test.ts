import { DOM_TYPE, VTermueElement, VTermueNode } from '@termue/core'
import { expect, test, describe } from 'bun:test'

describe('VTermue type hierarchy', () => {
    const classes = [
        { cls: VTermueNode, expected: DOM_TYPE.NODE, args: [] },
        { cls: VTermueElement, expected: DOM_TYPE.ELEMENT, args: ["div"] },
    ]

    for (const { cls, expected, args } of classes) {
        describe(cls.name, () => {
            test("should extend VTermueNode", () => {
                // @ts-ignore
                const instance = new cls(...args)
                expect(instance).toBeInstanceOf(VTermueNode)
            })

            test(`should have correct type: ${expected}`, () => {
                // @ts-ignore
                const instance = new cls(...args)
                expect(instance.type).toBe(expected)
            })

            test("should keep type immutable", () => {
                // @ts-ignore
                const instance = new cls(...args)
                const original = instance.type

                expect(() => (instance as any).type = "WRONG_VALUE").toThrow()
                expect(instance.type).toBe(original)
            })
        })
    }
})
