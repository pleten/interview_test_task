import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { Notification, ProfilePage } from '../pages';
import { browser } from 'protractor';
import { validUser } from '../data';
import {
  personal,
  multiDomain,
  cheapest
} from '../pages/components/filter.page-component';

describe('Homve page: Filters', () => {
  let homePage: HomePage;

  beforeEach(async () => {
    homePage = new HomePage();

    await homePage.open();
  });

  it('Personal filter sort by low assurance', async () => {
    await homePage.filterBy(personal);
    const allItemsDescriptions = await homePage.getAllItemsDescriptions();

    return await Promise.all(allItemsDescriptions.map(async (itemDesc: string) => {
        return await expect(itemDesc.includes('Low assurance')).toBeTruthy(
          `Looks like the item with description: "${itemDesc}" sorted incorrectly`
        );
      }));
  });

  it('Personal + Multi-Domain filters sort by low assurance and more then 1 domain in description', async () => {
    await homePage.filterBy(personal);
    await homePage.filterBy(multiDomain);

    const allItemsDescriptions = await homePage.getAllItemsDescriptions();

    return await Promise.all(allItemsDescriptions.map(async (itemDesc: string) => {
        return await expect(itemDesc.includes('Low assurance') && itemDesc.includes('3-100 domains')).toBeTruthy(
          `Looks like the item with description: "${itemDesc}" sorted incorrectly`
        );
      })
    );
  });

  it('Sort by "Featured" by default', async () => {
    const allItemsRatings = await homePage.getAllItemsRatings();

    const sortedItemsRatings = [...allItemsRatings].sort((a: number, b: number) => b - a);

    return await expect(allItemsRatings).toEqual(sortedItemsRatings);
  });

  it('Sort by "Cheapest" should sort by price', async () => {
    await homePage.filterBy(cheapest);
    const allItemsPrices = await homePage.getAllItemsPrices();
    
    const sortedPrices = [...allItemsPrices].sort((a: number, b: number) => a - b);

    return await expect(allItemsPrices).toEqual(sortedPrices);
  });
});
