import { compile, defineComponent } from "vue"
import { createApp, Box, Text } from './renderer'
import { TermueDOMElement } from "./TermueDOMNode"

const App = defineComponent({
    components: { Text, Box },
    data: () => ({ isVisible: true }),
    setup() {
        return compile(`
            <Box :style="{ color: 'red', marginTop: 5 }">
                <Text>
                    hello world
                </Text>
            </Box>
        `)
    }
})

const $root = new TermueDOMElement()

const vm = createApp(App).mount($root)

console.log(vm)
