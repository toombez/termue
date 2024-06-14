import { BorderStyles } from "../../styles"
import { GeneralElementStyles } from "../shared"
import { TermueDOMElement } from "./TermueDOMElement"

export type BoxElementStyles = Partial<
    GeneralElementStyles
    & BorderStyles
>

export class TermueBoxDOMElement extends TermueDOMElement {
    public nodeName: "element:box" = 'element:box'
    protected _styles: BoxElementStyles = {}
}
