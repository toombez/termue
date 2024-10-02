import { createRenderer, defineComponent, h } from "vue"
import TermueDOMNode, { TermueCommentDOMNode, TermueDOMElement, TermueTextDOMNode } from "./TermueDOMNode"

type RendererTermueDOMNode = Omit<
    TermueDOMNode,
    'children' | 'addChildren' | 'removeChildren'
>

type RendererTermueDOMElement = TermueDOMElement

const noop = () => {}

const { createApp } = createRenderer<RendererTermueDOMNode, RendererTermueDOMElement>({
    createComment: (text) => new TermueCommentDOMNode(text),
    createElement: (type) => {
        if (type === 'Box') {
            return new TermueDOMElement()
        }

        if (type === 'Text') {
            return new TermueDOMElement()
        }

        throw new Error()
    },
    createText: (text) => new TermueTextDOMNode(text),
    insert: (el, parent) => {
        el.setParent(parent)
    },
    nextSibling: (node) => null,
    parentNode: (node) => node.parent as TermueDOMElement | null,
    patchProp: (el, key, prevValue, nextValue) => {
        // if (key === 'style') {
        //     el.styleNode.setRawStyles(nextValue)
        // }
    },
    remove: noop,
    setElementText: noop,
    setText: noop,
})

const createTermueComponent = (tag: string) => {
    return defineComponent({
        inheritAttrs: false,
        name: tag,
        render() {
            return h(tag, this.$attrs, this.$slots?.default?.() || [])
        }
    })
}

const Box = createTermueComponent('Box')
const Text = createTermueComponent('Text')

export {
    createApp,
    Box,
    Text
}
