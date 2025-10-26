import { DOM_TYPE, type DomType } from "./constants"
import type VTermueElement from "./VTermueElement"

export default abstract class VTermueNode {
    public readonly uuid: string = crypto.randomUUID()
    public _parent: VTermueElement | null = null

    public readonly type: DomType = DOM_TYPE.NODE

    public set parent(parent: VTermueElement | null) {
        this._parent?.removeChild(this)
        parent?.appendChild(this)
    }

    public get parent(): VTermueElement | null {
        return this._parent
    }
}
