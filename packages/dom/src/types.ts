export interface INode {
    id: string
    parent: this | null
    children: Map<this['id'], this>

    setParent(parent: this): this
    removeParent(): this

    addChildren(...children: this[]): this
    removeChildren(...children: this[]): this

    isParentOf(maybeChild: this): maybeChild is INodeWithParent<typeof maybeChild>
    isChildOf(maybeParent: this): this is INodeWithParent<this>
    isHaveParent(): this is INodeWithParent<this>
    isHaveChildren(): boolean
    getChildrenCount(): number
}

export type INodeWithParent<TNode extends INode> = TNode & {
    parent: Exclude<TNode['parent'], null>
}
