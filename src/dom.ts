import Yoga from "yoga-layout"

export type YogaNode = ReturnType<typeof Yoga.Node.create>

export type YogaConfig = ReturnType<typeof Yoga.Config.create>

export type Tag =
    | 'Box'
    | 'Text'

type TraversalCallback<T> = (node: TermueNode) => T

type TraversalOptions<T, K> = {
    beforeCb?: TraversalCallback<T>
    afterCb?: TraversalCallback<K>
}

export class TermueNode {
    public yogaNode?: YogaNode | null = null
    private _parent?: TermueNode | null = null
    private _children: TermueNode[] = []

    public get children(): Readonly<typeof this._children> {
        return this._children
    }

    public get parent(): Readonly<typeof this._parent> {
        return this._parent
    }

    public set parent(node: NonNullable<typeof this._parent>) {
        node.addChild(this)
    }

    public addChild<T extends TermueNode>(node: T) {
        if (node.isChildOf(this)) {
            return
        }

        this._children.push(node)
        node._parent = this

        if (!this.yogaNode || !node.yogaNode) {
            return
        }

        this.yogaNode.insertChild(node.yogaNode, this.yogaNode.getChildCount())
    }

    public removeChild<T extends TermueNode>(node: T) {
        if (!node.isChildOf(this)) {
            return
        }

        const removeChildrenIndex = this._children
            .findIndex((_node) => _node === node)

        this._children.splice(removeChildrenIndex, 1)
        node._parent = null

        if (!this.yogaNode || !node.yogaNode) {
            return
        }

        this.yogaNode.removeChild(node.yogaNode)
    }

    public isChildOf(maybeParent: TermueNode): boolean {
        return !!maybeParent._children.find((node) => node === this)
    }

    public isParentOf(maybeChild: TermueNode): boolean {
        return maybeChild.isChildOf(this)
    }

    public static traverseDepth<T, K, N extends TermueNode>(node: N, options?: TraversalOptions<T, K>) {
        options?.beforeCb?.(node)

        for (let child of node.children) {
            this.traverseDepth(child, options)
        }

        options?.afterCb?.(node)
    }
}

export class TermueDOMElement extends TermueNode {
    public override yogaNode: YogaNode
    public readonly id: string = (Math.random() * 10000).toFixed(0).toString()

    public constructor(
        public tag: Tag,
        yogaConfig?: YogaConfig,
    ) {
        super()

        this.yogaNode = Yoga.Node.create(yogaConfig)
    }
}
