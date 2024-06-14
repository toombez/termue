import { TermueDOMNode } from "./nodes/TermueDOMNode"
import { TermueDOMElement } from "./elements/TermueDOMElement"
import { TermueCommentDOMNode } from "./nodes/TermueCommentDOMNode"
import { TermueTextDOMNode } from "./nodes/TermueTextDOMNode"
import { TermueBoxDOMElement } from "./elements/TermueBoxDOMElement"
import { TermueTextDOMElement } from "./elements/TermueTextDOMElement"
import { TermueRootDOMElement } from "./elements/TermueRootDOMElement"

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
