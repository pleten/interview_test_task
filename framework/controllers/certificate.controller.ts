import { SortingType } from '../enums/sorting.type';
import { Certificate } from '../models/certificate.model';
import { HomePage } from '../page-objects/home.page';
import { ConsoleLog } from '../reporters/console.log';

const homePage = new HomePage();

export class CertificateController {
    static async setFilter(filters) {
        ConsoleLog.trace(`Set filters:`);
        console.log(filters);
        return filters.forEach(async filter => {
            await homePage.clickFilterButtonByName(filter);
        });
    }

    static async setSorting(sortingType) {
        ConsoleLog.trace(`Set sorting [${sortingType}] order.`);
        if (sortingType === SortingType.Cheapest) {
            try {
                await homePage.clickCheapestSortingTypeButton();
            } catch (error) {
                ConsoleLog.trace(`Sorting type [${sortingType}] is already selected.`);
            }
        } else {
            try {
                await homePage.clickFeaturedSortingTypeButton();
            } catch (error) {
                ConsoleLog.trace(`Sorting type [${sortingType}] is already selected.`);
            }
        }
    }

    static async getList() {
        ConsoleLog.trace(`Get certificate list:`);
        const certList = new Array();
        await homePage.certificateList.each(async (certElement, index) => {
            const cert = new Certificate();
            cert.name = await homePage.getCertNameFromCertElement(certElement);
            cert.rating = await homePage.getCertRatingFromCertElement(certElement);
            cert.promo = await homePage.getCertPromoFromCertElement(certElement);
            cert.currentPrice = await homePage.getCertCurrentPriceFromCertElement(certElement);
            try {
                cert.oldPrice = await homePage.getCertOldPriceFromCertElement(certElement);
            } catch (error) {}
            cert.description = await homePage.getCertDescriptionFromCertElement(certElement);
            certList[index] = cert;
        });
        console.log(certList);
        return certList;
    }
}
