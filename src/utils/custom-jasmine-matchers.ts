import {Component} from "./components";
import {browser} from "protractor";
import {URLS} from "../assets";
import {Page} from "../objects/pages";
import {format} from "./formatters";
import {Type} from "../types";
import CustomMatcherFactories = jasmine.CustomMatcherFactories;

export const initCustomJasmineMatchers = () => {
    beforeAll(() => {
        const customMatchers = {
            toBePresent() {
                return {
                    compare(component: Component.Base) {
                        const result = {
                            pass: (async () => {
                                const passed = await component.isPresent();

                                result.message = `Expected [${component.alias}]${passed ? ` NOT` : ``} to be present`;

                                return passed;
                            })(),
                            message: ""
                        };
                        return result;
                    }
                };
            },
            toBeDisplayed() {
                return {
                    compare(component: Component.Base) {
                        const result = {
                            pass: (async () => {
                                const passed = await component.isDisplayed();

                                result.message = `Expected [${component.alias}]${passed ? ` NOT` : ``} to be displayed`;

                                return passed;
                            })(),
                            message: ""
                        };
                        return result;
                    }
                };
            },
            toHaveText() {
                return {
                    compare(component: Component.Base, expected: string) {
                        const result =  {
                            pass: (async () => {
                                const text = await component.getText();
                                const passed = format.noNewLines(text) === expected;

                                // tslint:disable-next-line:max-line-length
                                result.message = `Expected [${component.alias}]${passed ? ` NOT` : ``} to have text "${expected}" (actual text is "${format.noNewLines(text)}")`;

                                return passed;
                            })(),
                            message: ""
                        };
                        return result;
                    }
                };
            },
            eachToContainText() {
                return {
                    compare(component: Component.Base, expected: string|string[]) {
                        const result =  {
                            pass: (async () => {
                                const textArray = await component.getTextForEach();
                                const passed = textArray
                                    .map((text) => format.noNewLines(text))
                                    .every((text) => Array.isArray(expected)
                                        ? expected.some((expectedPart) => text.includes(expectedPart))
                                        : text.includes(expected)
                                    );

                                // tslint:disable-next-line:max-line-length
                                result.message = `Expected each [${component.alias}]${passed ? ` NOT` : ``} to contain text "${expected}"`;

                                return passed;
                            })(),
                            message: ""
                        };
                        return result;
                    }
                };
            },
            toHaveValue() {
                return {
                    compare(input: Component.FormInput, expected: string) {
                        const result =  {
                            pass: (async () => {
                                const value = await input.getValue();
                                const passed = value === expected;

                                // tslint:disable-next-line:max-line-length
                                result.message = `Expected [${input.alias}]${passed ? ` NOT` : ``} to have value "${expected}" (actual value is "${value}")`;

                                return passed;
                            })(),
                            message: ""
                        };
                        return result;
                    }
                };
            },
            toHaveSelectedValue() {
                return {
                    compare(checkbox: Component.Checkbox, expected: boolean) {
                        const result =  {
                            pass: (async () => {
                                const value = await checkbox.isSelected();
                                const passed = value === expected;

                                // tslint:disable-next-line:max-line-length
                                result.message = `Expected [${checkbox.alias}]${passed ? ` NOT` : ``} to be selected`;

                                return passed;
                            })(),
                            message: ""
                        };
                        return result;
                    }
                };
            },
            toBeSortedAscendingBy() {
                return {
                    compare<T extends Component.Base>(
                        component: T,
                        expected: Type.KeysOfType<T, Component.Base>|(Type.KeysOfType<T, Component.Base>)[]
                    ) {
                        const result =  {
                            pass: (async () => {
                                const expectedSortedProps = Array.isArray(expected) ? expected : [expected];
                                const textArrays = await Promise.all(
                                    expectedSortedProps.map(async (prop) => (await component.getTextForEach(prop)))
                                );
                                const tryConvert = (value: string) => isNaN(Number(value)) ? value : Number(value);
                                const compareWithPrevious = (indexOfArray: number, indexOfItem: number): boolean => {
                                    if (!indexOfItem) {
                                        return true;
                                    }

                                    const textArr = textArrays[indexOfArray];

                                    if (!textArr) {
                                        return true;
                                    }

                                    const currentValue = tryConvert(textArr[indexOfItem]);
                                    const previousValue = tryConvert(textArr[indexOfItem - 1]);

                                    if (currentValue > previousValue) {
                                        return true;
                                    }

                                    if (currentValue === previousValue) {
                                        return compareWithPrevious(indexOfArray + 1, indexOfItem);
                                    }

                                    return false;
                                };

                                const passed = textArrays[0].every((_, index) => compareWithPrevious(0, index));

                                // tslint:disable-next-line:max-line-length
                                result.message = `Expected list of [${component.alias}]${passed ? ` NOT` : ``} to be sorted ascending by ${expected}`;

                                return passed;
                            })(),
                            message: ""
                        };
                        return result;
                    }
                };
            },
            toBeOpened() {
                return {
                    compare(page: Page.Base) {
                        const result =  {
                            pass: (async () => {
                                const currentUrl = await browser.getCurrentUrl();
                                const expectedUrl = `${URLS.BASE}${page.path}`;
                                const passed = currentUrl === expectedUrl;

                                result.message = `Expected ${page.alias}${passed ? ` NOT` : ``} to be opened`;

                                return passed;
                            })(),
                            message: ""
                        };
                        return result;
                    }
                };
            },
        };

        jasmine.addMatchers(customMatchers as unknown as CustomMatcherFactories);
    });
};
