import { VTermueNode } from '@termue/core'
import { expect, test, describe } from 'bun:test'

describe("VTermueNode", () => {
    test("should generate a unique UUID", () => {
        const $node1 = new VTermueNode()
        const $node2 = new VTermueNode()
        expect($node1.uuid).not.toBe($node2.uuid)
    })

    test('should be correct UUID', () => {
        const $node = new VTermueNode()

        expect($node.uuid).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        )
    })

    test("should have no parent by default", () => {
        const $node = new VTermueNode()
        expect($node.parent).toBeNull()
    })
})
