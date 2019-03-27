import Page from '../pages/BasePage';

export function at<T: Page>(Page: T): T {
    return typeof Page === 'function' ? new Page() : Page;
}
