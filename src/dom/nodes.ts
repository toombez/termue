import Yoga from "yoga-layout"
import {
    TERMUE_ELEMENTS_NAMES,
    TERMUE_ELEMENTS_PREFIX,
    TERMUE_NODES_NAMES,
    TERMUE_NODE_PREFIX,
} from './constants'
import {
    ExtractElementNames,
    ExtractNodeNames,
    ExtractTags,
} from "./utils"

export type YogaNode = ReturnType<typeof Yoga.Node.create>
export type YogaConfig = ReturnType<typeof Yoga.Config.create>

export type TermueNodeName = ExtractNodeNames<typeof TERMUE_NODES_NAMES>
export type TermueElementName = ExtractElementNames<typeof TERMUE_ELEMENTS_NAMES>
export type Tag = ExtractTags<typeof TERMUE_ELEMENTS_NAMES>

export type TermueDOMNodeWithParent<
    T extends TermueDOMNode
> = T
    & {
        parentNode: TermueDOMElement
    }

export abstract class TermueDOMNode {
    public abstract readonly nodeName: TermueNodeName | TermueElementName
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

export abstract class TermueDOMElement extends TermueDOMNode {
    public abstract nodeName: TermueElementName
    public readonly yogaNode: YogaNode = Yoga.Node.create()
    public readonly childNodes: TermueDOMNode[] = []

    public removeParentNode(): void {
        this.parentNode?.yogaNode.removeChild(this.yogaNode)
        super.removeParentNode()
    }

    public setParentNode(parentNode: TermueDOMElement): void {
        super.setParentNode(parentNode)
        const childCount = parentNode.yogaNode.getChildCount()
        parentNode.yogaNode.insertChild(this.yogaNode, childCount)
    }

    public addChildNodes(...n: TermueDOMNode[]) {
        n.forEach((n) => n.parentNode = this)
    }
}

export class TermueTextDOMNode extends TermueDOMNode {
    public nodeName: "node:#text" = 'node:#text'
    public nodeValue: string

    public constructor(value: string) {
        super()
        this.nodeValue = value
    }
}

export class TermueCommentDOMNode extends TermueDOMNode {
    public nodeName: "node:#comment" = 'node:#comment'
    public nodeValue: string

    public constructor(value: string) {
        super()
        this.nodeValue = value
    }
}

export class TermueBoxDOMElement extends TermueDOMElement {
    public nodeName: "element:box" = 'element:box'
}

export class TermueTextDOMElement extends TermueDOMElement {
    public nodeName: "element:text" = 'element:text'
}

export class TermueRootDOMElement extends TermueDOMElement {
    public nodeName: "element:root" = 'element:root'
}

export type DOMNode =
    TermueDOMNode
    | TermueCommentDOMNode
    | TermueTextDOMNode

export type DOMElement =
    TermueDOMElement
    | TermueBoxDOMElement
    | TermueTextDOMElement
    | TermueRootDOMElement
