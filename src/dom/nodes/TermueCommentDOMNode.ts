import { TermueDOMNode } from "./TermueDOMNode"

export class TermueCommentDOMNode extends TermueDOMNode {
    public nodeName: "node:#comment" = 'node:#comment'
    public nodeValue: string

    public constructor(value: string) {
        super()
        this.nodeValue = value
    }
}
