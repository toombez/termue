import Yoga from "yoga-layout"

import { TERMUE_ELEMENTS_NAMES, TERMUE_NODES_NAMES } from './constants'

export type YogaNode = ReturnType<typeof Yoga.Node.create>
export type YogaConfig = ReturnType<typeof Yoga.Config.create>

export type TermueNodeNames = `node:#${typeof TERMUE_NODES_NAMES[number]}`
export type TermueElementNames = `element:${typeof TERMUE_ELEMENTS_NAMES[number]}`
export type Tag = Capitalize<typeof TERMUE_ELEMENTS_NAMES[number]>

export abstract class TermueDOMNode {
    public abstract readonly nodeName: TermueNodeNames | TermueElementNames
    public parentNode: DOMElement | null = null
}

export class TermueTextDOMNode extends TermueDOMNode {
    public nodeName: "node:#text" = 'node:#text'
    public nodeValue: string

    public constructor(value: string) {
        super()
        this.nodeValue = value
    }
}

export class TermueCommentDOMNode extends TermueDOMNode {
    public nodeName: "node:#comment" = 'node:#comment'
    public nodeValue: string

    public constructor(value: string) {
        super()
        this.nodeValue = value
    }
}

export abstract class TermueDOMElement extends TermueDOMNode {
    public abstract nodeName: TermueElementNames;
    public children: TermueDOMNode[] = []
    public yogaNode: YogaNode = Yoga.Node.create()

    public addChild(...child: TermueDOMNode[]) {
        this.children.push(...child)

        child.forEach((child) => {
            child.parentNode = this

            if (!TermueDOMElement.isTermueDOMElement(child)) {
                return
            }

            this.yogaNode.insertChild(child.yogaNode, this.yogaNode.getChildCount())
        })
    }

    public static isTermueDOMElement(
        node: TermueDOMNode
    ): node is TermueDOMElement {
        return node.nodeName.startsWith('element:')
    }
}

export class TermueBoxDOMElement extends TermueDOMElement {
    public nodeName: "element:box" = 'element:box'
}

export class TermueTextDOMElement extends TermueDOMElement {
    public nodeName: "element:text" = 'element:text'
    public children: TermueTextDOMNode[] = []

    public addChild(...child: TermueDOMNode[]): void {
        const textNodeChildren = child.filter((child) =>
            child.nodeName === 'node:#comment'
            || child.nodeName === 'node:#text'
        )

        super.addChild(...textNodeChildren)
    }
}

export class TermueRootDOMElement extends TermueDOMElement {
    public nodeName: "element:root" = 'element:root'
    public parentNode: null = null
}

// export class TermueDOMNode {
//     public yogaNode?: YogaNode | null = null
//     private _parent?: TermueNode | null = null
//     private _children: TermueNode[] = []

//     public get children(): typeof this._children {
//         return this._children
//     }

//     public get parent(): typeof this._parent {
//         return this._parent
//     }

//     public set parent(node: NonNullable<typeof this._parent>) {
//         node.addChild(this)
//     }

//     public addChild<T extends TermueNode>(node: T) {
//         if (node.isChildOf(this)) {
//             return
//         }

//         this._children.push(node)
//         node._parent = this

//         if (!this.yogaNode || !node.yogaNode) {
//             return
//         }

//         this.yogaNode.insertChild(node.yogaNode, this.yogaNode.getChildCount())
//     }

//     public removeChild<T extends TermueNode>(node: T) {
//         if (!node.isChildOf(this)) {
//             return
//         }

//         const removeChildrenIndex = this._children
//             .findIndex((_node) => _node === node)

//         this._children.splice(removeChildrenIndex, 1)
//         node._parent = null

//         if (!this.yogaNode || !node.yogaNode) {
//             return
//         }

//         this.yogaNode.removeChild(node.yogaNode)
//     }

//     public isChildOf(maybeParent: TermueNode): boolean {
//         return !!maybeParent._children.find((node) => node === this)
//     }

//     public isParentOf(maybeChild: TermueNode): boolean {
//         return maybeChild.isChildOf(this)
//     }

//     public static traverseDepth<T, K, N extends TermueNode>(node: N, options?: TraversalOptions<T, K>) {
//         options?.beforeCb?.(node)

//         for (let child of node.children) {
//             this.traverseDepth(child, options)
//         }

//         options?.afterCb?.(node)
//     }
// }

// export class TermueCommentNode extends TermueNode {
//     constructor(public text: string) {
//         super()
//     }
// }

// export class TermueTextNode extends TermueNode {
//     constructor(public text: string) {
//         super()
//     }
// }

// export class TermueDOMElement extends TermueNode {
//     public override yogaNode: YogaNode
//     public id: string = (Math.random() * 10000).toFixed(0).toString()

//     public constructor(
//         public tag: Tag,
//         yogaConfig?: YogaConfig,
//     ) {
//         super()

//         this.yogaNode = Yoga.Node.create(yogaConfig)
//     }

//     toString() {
//         return `<${this.tag} />`
//     }
// }

export type DOMNode = TermueDOMNode
    | TermueCommentDOMNode
    | TermueTextDOMNode

export type DOMElement =
    TermueDOMElement
    | TermueBoxDOMElement
    | TermueTextDOMElement
    | TermueRootDOMElement
