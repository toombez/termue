import Yoga from "yoga-layout"
import {
    TERMUE_ELEMENT_NAME,
    TERMUE_NODE_NAME,
    TermueDOMName,
    TermueElementName,
} from './constants'
import {
    FlexStyles,
    TextStyles,
    ColorStyles,
    BorderStyles,
    DimensionStyles,
    TextTransformStyles,
    PaddingStyles,
    MarginStyles,
    DisplayStyles,
    PositionStyles,
} from "../styles"

export type GeneralElementStyles =
    FlexStyles
    & TextTransformStyles
    & ColorStyles
    & DimensionStyles
    & PaddingStyles
    & MarginStyles
    & DisplayStyles
    & PositionStyles

export type BoxElementStyles = Partial<
    GeneralElementStyles
    & BorderStyles
>

export type TextElementStyles = Partial<
    GeneralElementStyles
    & TextStyles
>

export type YogaNode = ReturnType<typeof Yoga.Node.create>
export type YogaConfig = ReturnType<typeof Yoga.Config.create>

export type TermueDOMNodeWithParent<
    T extends TermueDOMNode
> = T
    & {
        parentNode: TermueDOMElement
    }

export abstract class TermueDOMNode {
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

export abstract class TermueDOMElement extends TermueDOMNode {
    public abstract nodeName: TermueElementName
    public readonly yogaNode: YogaNode = Yoga.Node.create()
    public readonly childNodes: TermueDOMNode[] = []
    protected _styles: BoxElementStyles | TextElementStyles = {}

    public removeParentNode(): void {
        this.parentNode?.yogaNode.removeChild(this.yogaNode)
        super.removeParentNode()
    }

    public setParentNode(parentNode: TermueDOMElement): void {
        super.setParentNode(parentNode)
        const childCount = parentNode.yogaNode.getChildCount()
        parentNode.yogaNode.insertChild(this.yogaNode, childCount)
    }

    public addChildNodes(...nodes: TermueDOMNode[]) {
        nodes
            .filter((node) => !node.isChildOf(this))
            .forEach((node) => node.parentNode = this)
    }

    public removeChildNodes(...nodes: TermueDOMNode[]) {
        nodes
            .filter((node) => node.isChildOf(this))
            .forEach((node) => node.parentNode = null)
    }

    public isParentOf<T extends TermueDOMNode>(
        maybeChild: T
    ): maybeChild is TermueDOMNodeWithParent<T> {
        return maybeChild.isChildOf(this)
    }

    public isHaveChildren(): boolean {
        return this.childNodes.length > 0
    }
}

abstract class TermueDOMNodeWithStringValue extends TermueDOMNode {
    public nodeValue: string

    public constructor(value: string) {
        super()
        this.nodeValue = value
    }
}

export class TermueTextDOMNode extends TermueDOMNodeWithStringValue {
    public readonly nodeName = TERMUE_NODE_NAME.TEXT
}

export class TermueCommentDOMNode extends TermueDOMNodeWithStringValue {
    public readonly nodeName = TERMUE_NODE_NAME.COMMENT
}

export class TermueBoxDOMElement extends TermueDOMElement {
    public readonly nodeName = TERMUE_ELEMENT_NAME.BOX
    protected _styles: BoxElementStyles = {}
}

export class TermueTextDOMElement extends TermueDOMElement {
    public readonly nodeName = TERMUE_ELEMENT_NAME.TEXT
    protected _styles: TextElementStyles = {}

    public addChildNodes(...nodes: TermueDOMNode[]): void {
        const isAllowedNodes = nodes
            .filter((node) =>
                node.nodeName === TERMUE_NODE_NAME.TEXT
                || node.nodeName === TERMUE_ELEMENT_NAME.TEXT
                || node.nodeName === TERMUE_NODE_NAME.COMMENT
            )
            .length === nodes.length

        if (!isAllowedNodes) {
            throw new Error("Text node can only contain text and commend nodes or text element")
        }

        super.addChildNodes(...nodes)
    }
}

export class TermueRootDOMElement extends TermueDOMElement {
    public readonly nodeName = TERMUE_ELEMENT_NAME.ROOT
    protected _parentNode: null = null
    protected _styles: BoxElementStyles = {}

    public get parentNode() {
        return this._parentNode
    }
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

/**
// Example

import {
    TermueTextDOMNode,
    TermueBoxDOMElement,
    TermueTextDOMElement,
    TermueDOMNode,
    TermueRootDOMElement,
    TermueDOMElement,
} from "./dom"

const $root = new TermueRootDOMElement()
const $box1 = new TermueBoxDOMElement()
const $text1 = new TermueTextDOMElement()
const $text2 = new TermueTextDOMElement()
const textNode1 = new TermueTextDOMNode("Text 1")
const textNode2 = new TermueTextDOMNode("Text 2")
const textNode3 = new TermueTextDOMNode("Text 3")

$root.addChildNodes($box1, $text1)
$text2.parentNode = $box1
textNode1.setParentNode($text1)
$text2.addChildNodes(textNode2, textNode3)

$box1.parentNode = null
$text1.removeParentNode()
$box1.removeChildNodes($text2)

console.log($root.childNodes.length, $root.yogaNode.getChildCount())
console.log($box1.childNodes.length, $box1.yogaNode.getChildCount())
console.log($text1.childNodes.length, $text1.yogaNode.getChildCount())
console.log($text2.childNodes.length, $text2.yogaNode.getChildCount())

$root.parentNode
 */
