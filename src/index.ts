import chalk from "chalk"
import wrapAnsi from "wrap-ansi"
import cliBoxes from "cli-boxes"
import Part, { TextTransformer } from "./render/Part"
import BorderPart from "./render/BorderPart"
import Output from "./render/Output"

const SCREEN_WIDTH = 20
const SCREEN_HEIGHT = 10

const screen = new Output(SCREEN_WIDTH, SCREEN_HEIGHT)

const borderTransformers: TextTransformer[] = [
    chalk.bgCyan.redBright,
]

screen.addParts(
    new BorderPart('top', SCREEN_WIDTH, {
        style: 'singleDouble',
        transformers: borderTransformers,
        x: 0,
        y: 0,
    }),
    new BorderPart('bottom', SCREEN_WIDTH, {
        style: 'singleDouble',
        transformers: borderTransformers, y: SCREEN_HEIGHT - 1
    }),
    new BorderPart('left', SCREEN_HEIGHT, {
        style: 'singleDouble',
        transformers: borderTransformers
    }),
    new BorderPart('right', SCREEN_HEIGHT, {
        style: 'singleDouble',
        transformers: borderTransformers, x: SCREEN_WIDTH - 1
    }),
)

screen.addParts(
    new Part("HELLO WORLD\nTHIS IS NEW LINE", {
        x: 1,
        y: 1,
        transformers: [(text) => wrapAnsi(text, SCREEN_WIDTH - 2)],
    }),
    new Part(" Over ", {
        x: 3,
        y: 1,
        transformers: [chalk.bgMagenta]
    }),
    new Part(" ", {
        x: 1,
        y: 3,
    }),
    new Part("=".repeat(SCREEN_WIDTH - 2), {
        x: 1,
        y: 4,
    }),
    new Part("LAST LINE", {
        x: 1,
        y: SCREEN_HEIGHT - 2
    }),
    new Part("Overflow", { x: 0, y: 20 }),
    new Part("Lorem ipsul", {
        x: 3,
        y: 3,
        transformers: [
            (text) => "*".repeat(text.length),
            chalk.red.bgMagenta.underline,
        ]
    })
)

console.log(screen.compose().result)
