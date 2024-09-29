import { TermueDOMName } from "../constants"
import TermueDOMElement from "../elements/TermueDOMElement"

export type TermueDOMNodeWithParent<
    T extends TermueDOMNode
> = T
    & {
        parentNode: TermueDOMElement
    }

export default abstract class TermueDOMNode {
    public abstract readonly nodeName: TermueDOMName
    protected _parentNode: TermueDOMElement | null = null

    public get parentNode(): TermueDOMElement | null {
        return this._parentNode
    }

    public set parentNode(maybeParent: TermueDOMElement | null) {
        if (TermueDOMNode.isEmptyNode(maybeParent)) {
            this.removeParentNode()
            return
        }

        this.setParentNode(maybeParent)
    }

    public removeParentNode() {
        if (!TermueDOMNode.isHaveParent<TermueDOMNode>(this)) {
            return
        }

        const childIndex = this
            .parentNode
            .childNodes
            .findIndex((node) => node === this)

        this.parentNode.childNodes.splice(childIndex, 1)
        this._parentNode = null
    }

    public setParentNode(parentNode: TermueDOMElement) {
        parentNode?.childNodes.push(this)
        this._parentNode = parentNode
    }

    public isChildOf(
        maybeParent: TermueDOMElement
    ): this is TermueDOMNodeWithParent<typeof this> {
        return maybeParent
            .childNodes
            .find((node) => node === this) !== undefined
    }

    public static isEmptyNode<T extends TermueDOMNode>(
        maybeNode: T | null
    ): maybeNode is null {
        return maybeNode === null
    }

    public static isHaveParent<T extends TermueDOMNode>(
        node: T
    ): node is TermueDOMNodeWithParent<T> {
        return node.parentNode !== null
    }
}
