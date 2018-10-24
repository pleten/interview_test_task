import {HomePo} from '../support/home.po';
import {AuthorizationPo} from '../support/authorization.po';

describe('My profile page', () => {

  const homePage = new HomePo();
  const authPage = new AuthorizationPo();

  beforeEach(() => {
    cy.visit(homePage.pageUrl);
    cy.get(homePage.selLoginBtn).click();
    cy.get(authPage.selEmailInp).type(authPage.emailLog);
    cy.get(authPage.selPasswordInp).as('passInput').type(authPage.passLog);
    cy.get(authPage.selBtn).contains('Login').click();
  });

  it('displays saved data', () => {
    cy.get(homePage.selDropdownSignedUsrBtn).click();
    cy.get(homePage.selDropdownItems).contains(homePage.viewProfileItem).click();

    cy.get('.description .text').as('texts');

    cy.get(homePage.selDropdownSignedUsrBtn).click();
    cy.get(homePage.selDropdownItems).contains(homePage.logoutItem).click();
    cy.url().should('to.contain', authPage.pageUrl);
    cy.get(authPage.selEmailInp).type(authPage.emailLog);
    cy.get(authPage.selPasswordInp).as('passInput').type(authPage.passLog);
    cy.get(authPage.selBtn).contains('Login').click();
    cy.get(homePage.selDropdownSignedUsrBtn).click();
    cy.get(homePage.selDropdownItems).contains(homePage.viewProfileItem).click();

    cy.get('@texts').should('to.be.visible');
  });
})
