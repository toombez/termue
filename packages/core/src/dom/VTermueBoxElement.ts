import { ELEMENT_TAG } from "./constants"
import VTermueElement from "./VTermueElement"

export default class VtermueBoxElement extends VTermueElement {
    public styles: Record<string, unknown> = {}

    public constructor() {
        super(ELEMENT_TAG.BOX)
    }
}
