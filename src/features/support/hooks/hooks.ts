import {After} from "cucumber";
import {HomePage} from "../../../domain/services/page-objects/home-page";
import {PAGE_OBJECT_TYPES} from "../../../domain/services/page-objects/page-object-types";

After({tags: '@home-page-personal-filter'}, async function () {
    const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
    await homePage.clickFilterButtons(['Personal']);
});

After({tags: '@home-page-business-one-domain-filter'}, async function () {
    const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
    await homePage.clickFilterButtons(['Business', 'One Domain']);
});