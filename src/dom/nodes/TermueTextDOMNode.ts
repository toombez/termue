import { TERMUE_NODE_NAME } from "../constants"
import TermueDOMNODEWithNodeValue from "./TermueDOMNodeWithNodeValue"

export class TermueTextDOMNode extends TermueDOMNODEWithNodeValue<string> {
    public readonly nodeName = TERMUE_NODE_NAME.TEXT
}
