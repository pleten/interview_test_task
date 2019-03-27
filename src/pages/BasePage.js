import Element from '../components/Element';

export default class Page {

    clickingTheButton(button){
        Element.of(button).click();
        return this;
    }

    elementIsDisplaying(element){
        Element.of(element).shouldBeVisible();
        return this;
    }

    elementIsExisting(element){
        Element.of(element).elementExists();
        return this;
    }

    elementIsNotExisting(element){
        Element.of(element).shouldNotExist(3000, true);
        return this;
    }

    inputToField(field, inputString){
        Element.of(field).clearEntireField();
        Element.of(field).enterValue(inputString);
        return this;
    }

    verifySystemMessage(message){
        Element.of(`//span[text()="${message}"]`).shouldBeVisible();
        return this;
    }

    verifyAttributeEqual(inputedValue, changedTitle){
        expect(inputedValue).to.be.equal(changedTitle);
        return this;
    }

    verifyAttributeNotEqual(inputedValue, changedTitle){
        expect(inputedValue).to.be.not.equal(changedTitle);
        return this;
    }
}


