import {Component} from "./components";
import {Type} from "../types";

declare global {
    namespace jasmine {
        interface Matchers<T> {
            toBePresent(): Promise<void>;

            toBeDisplayed(): Promise<void>;

            toHaveText(expected: string): Promise<void>;

            toHaveValue(expected: string): Promise<void>;

            toHaveSelectedValue(expected: boolean): Promise<void>;

            toBeSortedAscendingBy(
                expected: Type.KeysOfType<T, Component.Base>|(Type.KeysOfType<T, Component.Base>)[]
            ): Promise<void>;

            eachToContainText(expected: string|string[]): Promise<void>;

            toBeOpened(): Promise<void>;
        }
    }
}
