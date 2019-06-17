import { config } from '../config/test-config';
import Login from '../pages/login.page';
import myProfile from '../pages/myProfile.page';

const loginUser = { email: config.users.loginUser.email, password: config.users.loginUser.password };

describe('Logout', () => {


	beforeEach(() => {
		Login.reLogin(loginUser.email, loginUser.password);
	});

	it('5 - Log Out', () => {
		myProfile.logout();
		expect(Login.titleIsShown('Auth')).to.be.true;
		expect(Login.getCurrentURL()).to.be.equal('https://www.ssls.com/authorize');
	});

});