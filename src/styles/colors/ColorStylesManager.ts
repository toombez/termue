import StyleRulesManager from "../StyleRulesManager";
import BackgroundColorStyleRule from "./BackgroundColorStyleRule";
import TextColorStyleRule from "./TextColorStyleRule";

type ColorStylesManagerRules =
    TextColorStyleRule
    | BackgroundColorStyleRule

export default class ColorStylesManager extends StyleRulesManager<ColorStylesManagerRules> {
    public constructor() {
        super(new TextColorStyleRule(), new BackgroundColorStyleRule())
    }
}
