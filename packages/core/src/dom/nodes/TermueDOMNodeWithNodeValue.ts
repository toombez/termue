import TermueDOMNode from "./TermueDOMNode"

export default abstract class TermueDOMNodeWithNodeValue<T>
extends TermueDOMNode {
    public constructor(
        public nodeValue: T,
    ) {
        super()
    }
}
