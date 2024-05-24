import Yoga from "yoga-layout"

export type YogaNode = ReturnType<typeof Yoga.Node.create>

export type YogaConfig = ReturnType<typeof Yoga.Config.create>

export type Tag =
    | 'Box'
    | 'Text'

export class TermueNode {
    public yogaNode?: YogaNode | null = null
    private _parent?: TermueNode | null
    private _children: TermueNode[] = []

    public get children(): Readonly<typeof this._children> {
        return this._children
    }

    public get parent(): Readonly<typeof this._parent> {
        return this._parent
    }

    public set parent(node: NonNullable<typeof this._parent>) {
    }

    public addChild<T extends TermueNode>(node: T) {
    }

    public removeChild<T extends TermueNode>(node: T) {
    }
}
