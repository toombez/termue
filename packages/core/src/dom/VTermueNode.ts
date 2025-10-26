import { DOM_TYPE, type DomType } from "./constants"
import type VTermueElement from "./VTermueElement"

export default class VTermueNode {
    public readonly uuid: string = crypto.randomUUID()
    public _parent: VTermueElement | null = null

    protected readonly _type: DomType = DOM_TYPE.NODE

    public set parent(parent: VTermueElement | null) {
        this._parent?.removeChild(this)
        parent?.appendChild(this)
    }

    public get parent(): VTermueElement | null {
        return this._parent
    }

    public get type(): VTermueNode['_type'] {
        return this._type
    }
}
