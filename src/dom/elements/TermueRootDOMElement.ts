import { BoxElementStyles } from "./TermueBoxDOMElement"
import { TermueDOMElement } from "./TermueDOMElement"

export class TermueRootDOMElement extends TermueDOMElement {
    public nodeName: "element:root" = 'element:root'
    protected _parentNode: null = null
    protected _styles: BoxElementStyles = {}

    public get parentNode() {
        return this._parentNode
    }
}
