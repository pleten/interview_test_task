import Wd from '../core/wd';

export default class Page {

	// Page elements

	// Header
	// link one of [dealerships, dashboard, reports, users, calendar, messages, estimates, vehicles, profile, logout]
	navLink(link) { return link.toLowerCase() === 'logout' ? '//a[contains(.,"Logout")]' : `.nav-link[name="${link.toLowerCase()}"]`; }


	// Page actions
	open(path) {
		Wd.open(path);
	}

	selectNavLink(link) {
		Wd.click(this.navLink(link));
	}
}
