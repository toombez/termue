import { TermueDOMNode } from "./TermueDOMNode"

export class TermueTextDOMNode extends TermueDOMNode {
    public nodeName: "node:#text" = 'node:#text'
    public nodeValue: string

    public constructor(value: string) {
        super()
        this.nodeValue = value
    }
}
