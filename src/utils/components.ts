import {browser, by, element, ElementArrayFinder, ElementFinder, Key, Locator} from "protractor";
import {Type} from "../types";
import {format} from "./formatters";

export namespace Component {
    export class Base {
        parentComponent?: Base;

        constructor(public locator: Locator, private shortAlias?: string) {}

        get alias(): string {
            const componentName = format.plainText(this.constructor.name);
            const fullAlias = componentName !== "base" ?
                this.shortAlias ? `"${this.shortAlias}" ${componentName}` : componentName
                :  this.shortAlias || this.locator.toString();

            return this.parentComponent
                ? `${this.parentComponent.alias} >> ${fullAlias}`
                : fullAlias;
        }

        new<T extends Base, S extends any[]>(componentClass: (new(...args: S) => T), ...componentArgs: S): T {
            const newComponent = new componentClass(...componentArgs);
            newComponent.parentComponent = this;
            return newComponent;
        }

        async intoView() {
            try {
                const elementLocation = await this.getElementFinder().getLocation();
                await browser.executeScript(`window.scrollTo(200, ${elementLocation.y - 500});`);
            } catch (e) {
                if (!e.message.includes("element is not attached to the page document")
                    && !e.message.includes("angular testability are undefined")) {
                    throw e;
                }
            }
        }

        async click() {
            await this.intoView();
            await this.getElementFinder().click();
        }

        async sendKeys(...keys: string[]) {
            await this.intoView();
            await this.getElementFinder().sendKeys(...keys);
        }

        async isPresent() {
            return await this.getElementFinder().isPresent();
        }

        async isDisplayed() {
            await this.intoView();
            return await this.getElementFinder().isDisplayed();
        }

        async getText() {
            await this.intoView();
            return await this.getElementFinder().getText();
        }

        async getTextForEach(childKey?: Type.KeysOfType<this, Component.Base>): Promise<string[]> {
            await this.intoView();
            return await this.getElementArrayFinder().map((elem) => {
                if (childKey) {
                    // @ts-ignore
                    return elem.element(this[childKey].locator).getText();
                }
                return elem.getText();
            });
        }

        protected async getClasses() {
            await this.intoView();
            return await this.getElementFinder().getAttribute("class");
        }

        protected getElementFinder(): ElementFinder {
            return this.parentComponent ?
                this.parentComponent.getElementFinder().element(this.locator)
                : element(this.locator);
        }
        protected getElementArrayFinder(): ElementArrayFinder {
            return this.parentComponent ?
                this.parentComponent.getElementFinder().all(this.locator)
                : element.all(this.locator);
        }
    }

    export class Link extends Base {
        async getHref() {
            return await this.getElementFinder().getAttribute("href");
        }
    }

    export class FormInput extends Base {
        get formGroup(): Base {
            return this.new(Base, by.xpath('ancestor::div[contains(@class, "form-group")][1]'), "form group");
        }

        async getValue() {
            return this.getElementFinder().getAttribute("value");
        }
    }

    export class Field extends FormInput {
        get tooltip() {
            return this.formGroup.new(Component.Base, by.css(".left-tooltip-box:not(.ng-hide)"), "tooltip");
        }

        async setValue(value: string) {
            await this.sendKeys(Key.chord(Key.CONTROL, "a"), value);
        }
    }

    export class PasswordField extends Field {
        get showPasswordButton() {
            return this.formGroup.new(Button, by.css(".btn-box button"), "show password");
        }
    }

    export class Dropdown extends FormInput {
        getOption(indexOrSearch: number|string): DropdownOption {
            return this.new(DropdownOption, indexOrSearch);
        }

        async expand() {
            const isExpanded = await this.getOption(0).isDisplayed();

            if (!isExpanded) {
                await this.click();
            } else {
                console.warn(`${this.alias} is already expanded`);
            }
        }
    }

    export class Button extends FormInput {
    }

    export class Checkbox extends FormInput {
        async isSelected() {
            return await this.getElementFinder().isSelected();
        }
    }

    export class SelectableButton extends Base {
        async isSelected() {
            return (await this.getClasses()).includes("active");
        }

        async setSelected(selected: boolean) {
            (await this.isSelected()) !== selected && this.click();
        }
    }
}

class DropdownOption extends Component.Base {
    parentComponent: Component.Dropdown;

    constructor(indexOrSearch: number|string) {
        const xpathSelector = "//parent::div//li[contains(@class, \"drop-item\")]";
        let locator: Locator;

        if (typeof indexOrSearch === "number") {
            locator = by.xpath(`(${xpathSelector})[${indexOrSearch + 1}]`);
        } else {
            locator = by.xpath(`${xpathSelector}[contains(., "${indexOrSearch}")]`);
        }

        super(locator, indexOrSearch.toString());
    }

    async select() {
        await this.parentComponent.expand();
        await this.new(Component.Base, by.css("a, button"), "link").click();
    }
}
