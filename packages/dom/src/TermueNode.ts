import { v4 } from "uuid"
import { INode, INodeWithParent } from "./types"

export default class TermueNode implements INode {
    public readonly id: string = v4()
    public parent: this | null = null
    public children: Map<string, this> = new Map()

    public setParent(parent: this): this {
        if (parent === this) {
            throw new Error("Node cannot be parent for itself")
        }

        if (this.parent !== null) {
            this.parent.children.delete(this.id)
        }

        this.parent = parent
        this.parent.children.set(this.id, this)

        return this
    }

    public removeParent(): this {
        if (this.parent !== null) {
            this.parent.children.delete(this.id)
        }

        this.parent = null

        return this
    }

    public addChildren(...children: this[]): this {
        children
            .filter((child) => !child.isChildOf(this))
            .forEach((child) => child.setParent(this))

        return this
    }

    public removeChildren(...children: this[]): this {
        children
            .filter((child) => child.isChildOf(this))
            .forEach((child) => child.removeParent())

        return this
    }

    public isParentOf(maybeChild: this): maybeChild is INodeWithParent<this> {
        return maybeChild.parent === this
    }

    public isChildOf(maybeParent: this): this is INodeWithParent<this> {
        return maybeParent.isParentOf(this)
    }

    public isHaveParent(): this is INodeWithParent<this> {
        return this.parent !== null
    }

    public getChildrenCount(): number {
        return this.children.size
    }

    public isHaveChildren(): boolean {
        return this.getChildrenCount() > 0
    }
}
