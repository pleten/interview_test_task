import { openingHomePage } from '../functions/BaseFunctions';
import { at } from '../utils/PageFactory';
import basePage from '../pages/BasePage';
import homePage, {
    businessSSLButton,
    filterButtonCheapest,
    filterButtonFeatured,
    oneDomainButton,
    personalSSLButton
} from '../pages/HomePage';

describe('"Home page. Filtes tests',() => {
    beforeEach('Logging in', () => {
        openingHomePage();
    });

    afterEach('Cleaning browser session', () => {
        at(basePage).cleanBrowserSession();
    });

    it('Verifying that after pressing "Personal" button, each SSL plan on a page contains \n' +
        '"Domain validation"', () => {
        at(homePage).clickingTheButton(personalSSLButton)
            .verifyingSSLPlans('Domain validation')
            .clickingTheButton(personalSSLButton);
    });

    it('Verifying that after pressing "Business" and "One Domain" buttons, \n' +
        ' each SSL plan on a page contains “Organization Validation” and “1 domain”', () => {
        at(homePage).clickingTheButton(businessSSLButton)
            .clickingTheButton(oneDomainButton)
            .verifyingSSLPlans('Organization validation')
            .verifyingSSLPlans('1 domain')
            .clickingTheButton(businessSSLButton)
            .clickingTheButton(oneDomainButton);
    });

    it('Verifying that filter by "Cheapest" works correctly', () => {
        at(homePage).clickingTheButton(filterButtonCheapest)
            .elementIsDisplaying(filterButtonFeatured)
            .verifyFilteredByPrice();
    });
});
