import { TERMUE_NODE_NAME } from "../constants"
import TermueDOMNodeWithNodeValue from "./TermueDOMNodeWithNodeValue"

export default class TermueCommentDOMNode
extends TermueDOMNodeWithNodeValue<string> {
    public readonly nodeName = TERMUE_NODE_NAME.COMMENT
}
