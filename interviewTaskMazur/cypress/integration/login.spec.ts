import {HomePo} from '../support/home.po';
import {AuthorizationPo} from '../support/authorization.po';

describe('Login functionality', () => {
  const homePage = new HomePo();
  const authPage = new AuthorizationPo();

  beforeEach(() => {
    cy.visit(homePage.pageUrl);
    cy.get(homePage.selLoginBtn).click();
  });

  it('login as a registered user and logout', () => {
    cy.get(authPage.selEmailInp).type(authPage.emailLog);
    cy.get(authPage.selPasswordInp).as('passInput').type(authPage.passLog);

    cy.get('@passInput')
      .should('to.have.attr', 'type', 'password');

    cy.get(authPage.selEyeIcon).click();

    cy.get('@passInput')
      .should('to.have.attr', 'type', 'text');

    cy.get(authPage.selBtn).contains('Login').click();

    cy.url()
      .should('to.be', homePage.pageUrl);
    cy.get(homePage.selLoginBtn)
      .should('to.have.descendants', homePage.selSignedUsrBtn)
      .and('to.have.descendants', homePage.selDropdownSignedUsrBtn);
    cy.get(homePage.selSignedUsrBtn)
      .should('to.have.text', authPage.emailLog);

    cy.get(homePage.selDropdownSignedUsrBtn).click();
    cy.get(homePage.selDropdownItems).contains(homePage.logoutItem).click();
    cy.url().should('to.contain', authPage.pageUrl);
  });

  it('login as a not registered user', () => {
    cy.get(authPage.selEmailInp).type(authPage.emailNotRegistered);
    cy.get(authPage.selPasswordInp).as('passInput').type(authPage.passLog);

    cy.get('@passInput')
      .should('to.have.attr', 'type', 'password');

    cy.get(authPage.selEyeIcon).click();

    cy.get('@passInput')
      .should('to.have.attr', 'type', 'text');

    cy.get(authPage.selBtn).contains('Login').click();
    cy.get(authPage.selNotification)
      .should('to.be.visible');
    cy.get(authPage.selNotificationText)
      .should('to.have.text', authPage.notifyNotRegistered);
  });

  it('enter invalid email', () => {
    cy.get(authPage.selEmailInp).type(authPage.emailInValid);
    cy.get(authPage.selPasswordInp).as('passInput').type(authPage.passLog);

    cy.get('@passInput')
      .should('to.have.attr', 'type', 'password');

    cy.get(authPage.selEyeIcon).click();

    cy.get('@passInput')
      .should('to.have.attr', 'type', 'text');

    cy.get(authPage.selBtn).contains('Login').click();
    cy.get(authPage.selEmailError).first().as('errorMess')
      .should('to.be.visible');
    cy.get('@errorMess').children(authPage.selErrorText)
      .should('to.contain', authPage.notifyInvalidEmail);
  });

  it('leave email and password fields empty', () => {
    cy.get(authPage.selEmailInp).clear();
    cy.get(authPage.selPasswordInp).clear();

    cy.get(authPage.selBtn).contains('Login').click();
    cy.get(authPage.selEmailError).last().as('errorMess')
      .should('to.be.visible');
    cy.get('@errorMess').children(authPage.selErrorText)
      .should('to.contain', authPage.notifyEmptyEmail);
    cy.get(authPage.selPassError).last().as('errorPass')
      .should('to.be.visible');
    cy.get('@errorPass').children(authPage.selErrorText)
      .should('to.contain', authPage.notifyEmptyPass);
  });
});
