import { TERMUE_NODE_NAME } from "../constants"
import { TermueDOMNode } from "./TermueDOMNode"

export class TermueCommentDOMNode extends TermueDOMNode {
    public readonly nodeName = TERMUE_NODE_NAME.COMMENT
    public nodeValue: string

    public constructor(value: string) {
        super()
        this.nodeValue = value
    }
}
