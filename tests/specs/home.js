import { config } from '../config/test-config';
import Login from '../pages/login.page';
import Home from '../pages/home.page';

const loginUser = { email: config.users.loginUser.email, password: config.users.loginUser.password };

describe('Home page', () => {


	beforeEach(() => {
		Login.reLogin(loginUser.email, loginUser.password);
	});

	it('8.1 - "Personal" filter', () => {
		Home.clickOnFilter('Personal');
		const filterText = Home.getAllTextFromCards();
		filterText.forEach( filterItem => {
			expect(filterItem.toLowerCase()).contain('Domain Validation'.toLowerCase());
		});
		Home.clickOnFilter('Personal');
	});

	it('8.2 - "Business" and “One domain” filter', () => {
		Home.clickOnFilter('Business');
		Home.clickOnFilter('one domain');
		const filterText = Home.getAllTextFromCards();
		filterText.forEach( filterItem => {
			expect(filterItem.toLowerCase()).contain('Domain Validation'.toLowerCase() && '1 domain' );
		});
		Home.clickOnFilter('Business');
		Home.clickOnFilter('one domain');
	});

	it('8.3 - Sorting', () => {
		Home.clickOnSortButton('ASC');
		const prices = Home.getAllPrices();
		expect(Home.checkSorting(prices,'ASC')).to.be.true;
	});

});