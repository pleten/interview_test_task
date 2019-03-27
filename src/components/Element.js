import BaseElement from './BaseElement';

export default class Element extends BaseElement {
    // Element.of('locator') is needed to create a new instance of Element class
    static of(value) {
        return new Element(value);
    }
}
