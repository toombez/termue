import TermueNode from "./TermueNode"
import Yoga, { Node as YogaNode } from 'yoga-layout'
import TermueStyleNode from "./TermueStyleNode"

export default class TermueDOMNode extends TermueNode {
    public yogaNode: YogaNode = Yoga.Node.create()
    public styleNode: TermueStyleNode = new TermueStyleNode()

    public setParent(parent: this): this {
        if (this.parent !== null) {
            this.parent.yogaNode.removeChild(this.yogaNode)
            this.styleNode.removeParent()
        }

        parent.yogaNode.insertChild(this.yogaNode, parent.yogaNode.getChildCount())
        this.styleNode.setParent(parent.styleNode)

        super.setParent(parent)

        return this
    }

    public removeParent(): this {
        if (this.parent !== null) {
            this.parent.yogaNode.removeChild(this.yogaNode)
            this.styleNode.removeParent()
        }

        super.removeParent()

        return this
    }
}

export class TermueDOMNodeWithValue<T> extends TermueDOMNode {
    public constructor(
        public value: T
    ) {
        super()
    }
}

export class TermueCommentDOMNode extends TermueDOMNodeWithValue<string> {}

export class TermueTextDOMNode extends TermueDOMNodeWithValue<string> {}

export class TermueDOMElement extends TermueDOMNode {}
