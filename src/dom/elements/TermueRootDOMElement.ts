import { TERMUE_ELEMENT_NAME } from "../constants"
import { BoxElementStyles } from "./TermueBoxDOMElement"
import { TermueDOMElement } from "./TermueDOMElement"

export class TermueRootDOMElement extends TermueDOMElement {
    public readonly nodeName = TERMUE_ELEMENT_NAME.ROOT
    protected _parentNode: null = null
    protected _styles: BoxElementStyles = {}

    public get parentNode() {
        return this._parentNode
    }
}
