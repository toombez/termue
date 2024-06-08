import Yoga from "yoga-layout"
import {
    TERMUE_ELEMENTS_NAMES,
    TERMUE_ELEMENTS_PREFIX,
    TERMUE_NODES_NAMES,
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

export abstract class TermueDOMNode {
    public abstract readonly nodeName: TermueNodeName | TermueElementName
    protected _parentNode: TermueDOMElement | null = null

    public get parentNode(): typeof this._parentNode {
        return this._parentNode
    }

    public set parentNode(node: TermueDOMElement | null) {
        if (this.isChildOf(node)) {
            return
        }

        this._parentNode = node
    }

    public isChildOf(maybeParent: TermueDOMElement | null): boolean {
        const isMaybeParentEmpty = maybeParent === null
        const isNotHaveParentNode = this.parentNode === null

        if (isMaybeParentEmpty || !isNotHaveParentNode) {
            return false
        }

        return this.parentNode === maybeParent
    }
}

export abstract class TermueDOMElement extends TermueDOMNode {
    public abstract nodeName: TermueElementName
    protected _childNodes: TermueDOMNode[] = []
    public yogaNode: YogaNode = Yoga.Node.create()

    public get childNodes(): Readonly<typeof this._childNodes> {
        return this._childNodes
    }

    public get parentNode(): typeof this._parentNode {
        return super.parentNode
    }

    public set parentNode(node: TermueDOMElement | null) {
        if (node === null && this.parentNode !== null) {
            this.parentNode.yogaNode.removeChild(this.yogaNode)
        } else if (node !== null) {
            const yogaChildCount = node.yogaNode.getChildCount()
            node.yogaNode.insertChild(this.yogaNode, yogaChildCount)
        }

        super.parentNode = node
    }

    public addChildNodes(...nodes: TermueDOMNode[]) {
        nodes.forEach((node) => {
            node.parentNode = this
            this._childNodes.push(node)
        })
    }

    public removeChildNodes(...nodes: TermueDOMNode[]) {
        nodes
            .filter((node) => node.isChildOf(this))
            .forEach((childNode) => {
                childNode.parentNode = null
                const indexOfChildNode = this.childNodes
                    .findIndex((node) => node === childNode)

                this._childNodes.splice(indexOfChildNode, 1)
            })
    }

    public isParentOf(maybeChild: TermueDOMNode): boolean {
        return maybeChild.isChildOf(this)
    }

    public static isTermueDOMElement(
        node: TermueDOMNode
    ): node is TermueDOMElement {
        return node.nodeName.startsWith(TERMUE_ELEMENTS_PREFIX)
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
    public children: TermueTextDOMNode[] = []

    public addChildNodes(...nodes: TermueDOMNode[]): void {
        const textNodeChildren = nodes
            .filter((node) =>
                node.nodeName === 'node:#comment'
                || node.nodeName === 'node:#text'
            )

        super.addChildNodes(...textNodeChildren)
    }

    public static isTextDOMElement(
        node: TermueDOMNode
    ): node is TermueTextDOMElement {
        return node.nodeName === 'element:text'
    }
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
