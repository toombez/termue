import { TextStyles } from "../../styles"
import { TermueDOMNode } from "../nodes/TermueDOMNode"
import { GeneralElementStyles } from "../shared"
import { TermueDOMElement } from "./TermueDOMElement"

export type TextElementStyles = Partial<
    GeneralElementStyles
    & TextStyles
>

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
