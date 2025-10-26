import { VTermueElement, VTermueNode } from '@termue/core'
import { expect, test, describe, beforeEach } from 'bun:test'

describe("VTermue hierarchy", () => {
    let node: VTermueNode
    let parentA: VTermueElement
    let parentB: VTermueElement

    beforeEach(() => {
        node = new VTermueNode()
        parentA = new VTermueElement("div" as any)
        parentB = new VTermueElement("span" as any)
    })

    test("should add node to parent's children when parent is set", () => {
        node.parent = parentA
        expect(parentA.children).toContain(node)
        expect(node.parent).toBe(parentA)
    })

    test("should move node between parents when parent changes", () => {
        node.parent = parentA
        node.parent = parentB

        expect(parentA.children).not.toContain(node)
        expect(parentB.children).toContain(node)
        expect(node.parent).toBe(parentB)
    })

    test("should remove node from parent when parent is set to null", () => {
        node.parent = parentA
        node.parent = null

        expect(parentA.children).not.toContain(node)
        expect(node.parent).toBeNull()
    })

    test("should correctly link parent and child via appendChild", () => {
        parentA.appendChild(node)
        expect(node.parent).toBe(parentA)
        expect(parentA.children).toContain(node)
    })

    test("should correctly unlink parent and child via removeChild", () => {
        parentA.appendChild(node)
        parentA.removeChild(node)

        expect(node.parent).toBeNull()
        expect(parentA.children).not.toContain(node)
    })

    test("should not duplicate the same child when appendChild is called twice", () => {
        parentA.appendChild(node)
        parentA.appendChild(node)

        const ids = parentA.children.map(c => c.uuid)
        const uniqueIds = new Set(ids)
        expect(ids.length).toBe(uniqueIds.size)
    })

    test("should move node between parents when appended to another element", () => {
        parentA.appendChild(node)
        parentB.appendChild(node)

        expect(node.parent).toBe(parentB)
        expect(parentA.children).not.toContain(node)
        expect(parentB.children).toContain(node)
    })
})
