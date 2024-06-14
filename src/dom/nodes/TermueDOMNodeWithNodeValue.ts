import { TermueDOMNode } from "./TermueDOMNode";

export default abstract class TermueDOMNODEWithNodeValue<T>
extends TermueDOMNode {
    public constructor(
        public nodeValue: T,
    ) {
        super()
    }
}
