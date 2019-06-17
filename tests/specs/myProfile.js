import { config } from '../config/test-config';
import Login from '../pages/login.page';
import myProfile from '../pages/myProfile.page';

const loginUser = { email: config.users.loginUser.email, password: config.users.loginUser.password };
let details = {};

describe('My Profile', () => {


	beforeEach(() => {
		Login.reLogin(loginUser.email, loginUser.password);
		myProfile.openProfilePage();
		details = myProfile.getUserDetailsText();
		Login.open(config.baseUrl);
	});

	it('6 - My profile page. Client area', () => {
		myProfile.openProfilePage();
		let newDetails = myProfile.getUserDetailsText();
		expect(myProfile.compareObjects(details,newDetails)).to.be.true;
	});


	it('7 - My profile page. Refresh support pin', () => {
		myProfile.openProfilePage();
		myProfile.refreshPin();
		let newDetails = myProfile.getUserDetailsText();
		expect(newDetails.pin !== details.pin).to.be.true;
	});
});