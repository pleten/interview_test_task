import { CertificateController } from '../framework/controllers/certificate.controller';
import { NavigationController } from '../framework/controllers/navigation.controller';
import { FilterType } from '../framework/enums/filter.type';
import { SortingType } from '../framework/enums/sorting.type';
import { Certificate } from '../framework/models/certificate.model';
import { User } from '../framework/models/user.model';
import { ScreenShot } from '../framework/reporters/screenshot';

describe('certificate.filters', () => {
    const testUser = new User('ssls.automation+5@gmail.com', '123456');
    const testData = [
        {
            id: '1.1',
            filters: [FilterType.Personal],
            expectedCertificateList: [
                {
                    name: 'PositiveSSL Multi-Domain',
                    rating: 4,
                    promo: { isHot: false, isSale: true },
                    currentPrice: { value: 22.22, currency: '$', units: 'YR' },
                    oldPrice: { value: 38.88, currency: '$', units: 'YR' },
                    description: {
                        brand: 'Comodo',
                        domains: '3-100 domains',
                        secureArea: 'www.site.com or site.com',
                        validation: 'Domain validation',
                        assurance: 'Low assurance',
                    },
                },
                {
                    name: 'EssentialSSL',
                    rating: 5,
                    promo: { isHot: true, isSale: true },
                    currentPrice: { value: 14.88, currency: '$', units: 'YR' },
                    oldPrice: { value: 28.99, currency: '$', units: 'YR' },
                    description: {
                        brand: 'Comodo',
                        domains: '1 domain',
                        secureArea: 'www.site.com + site.com',
                        validation: 'Domain validation',
                        assurance: 'Medium assurance',
                    },
                },
                {
                    name: 'EssentialSSL Wildcard',
                    rating: 5,
                    promo: { isHot: false, isSale: true },
                    currentPrice: { value: 72.88, currency: '$', units: 'YR' },
                    oldPrice: { value: 98.99, currency: '$', units: 'YR' },
                    description: {
                        brand: 'Comodo',
                        domains: '1 domain + all subdomains',
                        secureArea: 'www.site.com + site.com',
                        validation: 'Domain validation',
                        assurance: 'Medium assurance',
                    },
                },
                {
                    name: 'PositiveSSL',
                    rating: 4,
                    promo: { isHot: false, isSale: false },
                    currentPrice: { value: 5.88, currency: '$', units: 'YR' },
                    description: {
                        brand: 'Comodo',
                        domains: '1 domain',
                        secureArea: 'www.site.com + site.com',
                        validation: 'Domain validation',
                        assurance: 'Low assurance',
                    },
                },
                {
                    name: 'PositiveSSL Wildcard',
                    rating: 4,
                    promo: { isHot: false, isSale: false },
                    currentPrice: { value: 74.88, currency: '$', units: 'YR' },
                    description: {
                        brand: 'Comodo',
                        domains: '1 domain + all subdomains',
                        secureArea: 'www.site.com + site.com',
                        validation: 'Domain validation',
                        assurance: 'Low assurance',
                    },
                },
            ],
        },
        {
            id: '1.2',
            filters: [FilterType.Personal, FilterType.MultiDomain],
            expectedCertificateList: [
                {
                    name: 'PositiveSSL Multi-Domain',
                    rating: 4,
                    promo: { isHot: false, isSale: true },
                    currentPrice: { value: 22.22, currency: '$', units: 'YR' },
                    oldPrice: { value: 38.88, currency: '$', units: 'YR' },
                    description: {
                        brand: 'Comodo',
                        domains: '3-100 domains',
                        secureArea: 'www.site.com or site.com',
                        validation: 'Domain validation',
                        assurance: 'Low assurance',
                    },
                },
            ],
        },
    ];

    beforeEach(async () => {
        await NavigationController.login({ user: testUser });
        await NavigationController.goToCertificates();
    });

    afterEach(async () => {
        await NavigationController.logout();
    });

    testData.forEach(testItem => {
        it(`8. Home page. Filters. ${testItem.id}`, async () => {
            await CertificateController.setFilter(testItem.filters);
            const actualCertificateList = JSON.stringify(await CertificateController.getList());
            await ScreenShot.save('certs.list');
            const expectedCertificateList = JSON.stringify(testItem.expectedCertificateList);
            expect(actualCertificateList).toEqual(expectedCertificateList);
        });
    });

    it(`8. Home page. Filters. 1.3`, async () => {
        await CertificateController.setFilter([FilterType.Personal, FilterType.MultiDomain]);
        await ScreenShot.save('certs.before.sorting');
        await CertificateController.setSorting(SortingType.Cheapest);
        await ScreenShot.save('certs.after.sorting');
        const sortedCertList = await CertificateController.getList();
        expect(certCurrentPriceToArray(sortedCertList)).toEqual(certCurrentPriceToArray(sortedCertList).sort(ascending));
    });

    it(`8. Home page. Filters. 1.4`, async () => {
        await CertificateController.setFilter([FilterType.Personal, FilterType.SubDomains]);
        await ScreenShot.save('certs.after.sorting');
        const sortedCertList = await CertificateController.getList();
        expect(certRatingToArray(sortedCertList)).toEqual(certRatingToArray(sortedCertList).sort(descending));
    });

    function certCurrentPriceToArray(certList: Certificate[]): number[] {
        const result = new Array<number>();
        certList.forEach((cert: Certificate) => {
            result.push(cert.currentPrice.value);
        });
        return result;
    }

    function certRatingToArray(certList: Certificate[]): number[] {
        const result = new Array<number>();
        certList.forEach((cert: Certificate) => {
            result.push(cert.rating);
        });
        return result;
    }

    function ascending(a: number, b: number): number {
        return a - b;
    }

    function descending(a: number, b: number): number {
        return b - a;
    }
});
