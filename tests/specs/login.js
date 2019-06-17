import { config } from '../config/test-config';
import Login from '../pages/login.page';
import myProfile from '../pages/myProfile.page';

const loginUser = { email: config.users.loginUser.email, password: config.users.loginUser.password };

describe('Authorization', () => {

	beforeEach(() => {
		Login.open(config.baseUrl);
	});

	it('2 - Authorization page. Not registered user', () => {
		Login.proceedToAuthPage();
		expect(Login.titleIsShown('Auth')).to.be.true;
		expect(Login.getCurrentURL()).to.be.equal('https://www.ssls.com/authorize');
		Login.fillFormWith('fakeemail@gmail.com', loginUser.password);
		Login.submitLoginForm();
		expect(Login.getTextOfNonExistingEmailNotification()).equal('Uh oh! Email or password is incorrect');
	});

	it('3 - Authorization page. Invalid email', () => {
		Login.proceedToAuthPage();
		expect(Login.titleIsShown('Auth')).to.be.true;
		expect(Login.getCurrentURL()).to.be.equal('https://www.ssls.com/authorize');
		Login.fillFormWith('fakeemail@@gmail.com', loginUser.password);
		Login.submitLoginForm();
		expect(Login.getTextOfInvalidEmailNotification().replace('\n',' ')).equal('Uh oh! This isn’t an email');
	});

	it('4 - Authorization page. Empty fields', () => {
		Login.proceedToAuthPage();
		expect(Login.titleIsShown('Auth')).to.be.true;
		expect(Login.getCurrentURL()).to.be.equal('https://www.ssls.com/authorize');
		Login.submitLoginForm();
		expect(Login.getTextOfEmptyEmailNotification().replace('\n',' ')).to.be.equal("Oops, please enter your email");
		expect(Login.getTextOfEmptyPasswordNotification().replace('\n',' ')).equal('Looks like you’ve missed this one');
	});

	it('1 - Authorization page (Welcome back!)', () => {
		Login.proceedToAuthPage();
		expect(Login.titleIsShown('Auth')).to.be.true;
		expect(Login.getCurrentURL()).to.be.equal('https://www.ssls.com/authorize');
		Login.fillFormWith(loginUser.email, loginUser.password);
		expect(Login.getPasswordText()).equal(config.users.loginUser.password);
		expect(Login.getStatusOfPassswordField()).equal('text');
		Login.submitLoginForm();
		expect(Login.titleIsShown('Home')).to.be.true;
		expect(Login.getCurrentURL()).to.be.equal('https://www.ssls.com/');
		expect(Login.getTextOfProfileButton()).equal(loginUser.email);
		myProfile.logout();
	});
});

