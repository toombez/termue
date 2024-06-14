import {
    TextStyles,
    BorderStyles,
} from "../styles"
import { GeneralElementStyles, TermueElementName, TermueNodeName, YogaNode } from "./shared"
import { TermueDOMNode } from "./nodes/TermueDOMNode"
import { TermueDOMElement } from "./elements/TermueDOMElement"
import { TermueCommentDOMNode } from "./nodes/TermueCommentDOMNode"
import { TermueTextDOMNode } from "./nodes/TermueTextDOMNode"

export type BoxElementStyles = Partial<
    GeneralElementStyles
    & BorderStyles
>

export type TextElementStyles = Partial<
    GeneralElementStyles
    & TextStyles
>

export class TermueBoxDOMElement extends TermueDOMElement {
    public nodeName: "element:box" = 'element:box'
    protected _styles: BoxElementStyles = {}
}

export class TermueTextDOMElement extends TermueDOMElement {
    public nodeName: "element:text" = 'element:text'
    protected _styles: TextElementStyles = {}

    public addChildNodes(...nodes: TermueDOMNode[]): void {
        const isAllowedNodes = nodes
            .filter((node) =>
                node.nodeName === 'node:#text'
                || node.nodeName === 'element:text'
                || node.nodeName === 'node:#comment'
            )
            .length === nodes.length

        if (!isAllowedNodes) {
            throw new Error("Text node can only contain text and commend nodes or text element")
        }

        super.addChildNodes(...nodes)
    }
}

export class TermueRootDOMElement extends TermueDOMElement {
    public nodeName: "element:root" = 'element:root'
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
