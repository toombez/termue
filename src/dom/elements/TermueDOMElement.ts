import Yoga from "yoga-layout"

import {
    TermueDOMNode,
    TermueDOMNodeWithParent
} from "../nodes/TermueDOMNode"
import {
    TermueElementName,
    YogaNode
} from "../shared"
import { BoxElementStyles } from "./TermueBoxDOMElement"
import { TextElementStyles } from "./TermueTextDOMElement"

export abstract class TermueDOMElement extends TermueDOMNode {
    public abstract readonly nodeName: TermueElementName
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
