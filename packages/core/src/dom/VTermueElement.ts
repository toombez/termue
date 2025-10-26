import { DOM_TYPE, type DomType, type ElementTag } from "./constants"
import VTermueNode from "./VTermueNode"

import Yoga from "yoga-layout"
import type { Node as YogaNode } from 'yoga-layout'

export default class VTermueElement extends VTermueNode {
    public children: Array<VTermueNode> = []
    protected override _type: DomType = DOM_TYPE.ELEMENT
    public yogaNode: YogaNode = Yoga.Node.create()

    public constructor(
        public readonly tag: ElementTag
    ) {
        super()
    }

    public appendChild(node: VTermueNode): void {
        this.children.push(node)

        node._parent?.removeChild(node)
        node._parent = this

        if (node instanceof VTermueElement) {
            this.yogaNode.insertChild(node.yogaNode, this.yogaNode.getChildCount())
        }
    }

    public removeChild(child: VTermueNode): void {
        this.children = this.children.filter((node) => node.uuid !== child.uuid)
        child._parent = null

        if (child instanceof VTermueElement) {
            this.yogaNode.removeChild(child.yogaNode)
        }
    }
}
