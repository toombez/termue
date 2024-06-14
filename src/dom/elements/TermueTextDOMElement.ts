import { TextStyles } from "../../styles"
import { TERMUE_ELEMENT_NAME, TERMUE_NODE_NAME } from "../constants"
import { TermueDOMNode } from "../nodes/TermueDOMNode"
import { GeneralElementStyles } from "../shared"
import { TermueDOMElement } from "./TermueDOMElement"

export type TextElementStyles = Partial<
    GeneralElementStyles
    & TextStyles
>

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
