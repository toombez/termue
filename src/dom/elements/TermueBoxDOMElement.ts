import { BorderStyles } from "../../styles"
import { TERMUE_ELEMENT_NAME } from "../constants"
import { GeneralElementStyles } from "../shared"
import { TermueDOMElement } from "./TermueDOMElement"

export type BoxElementStyles = Partial<
    GeneralElementStyles
    & BorderStyles
>

export class TermueBoxDOMElement extends TermueDOMElement {
    public readonly nodeName = TERMUE_ELEMENT_NAME.BOX
    protected _styles: BoxElementStyles = {}
}
