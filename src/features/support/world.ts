import {setWorldConstructor, World} from "cucumber";
import {Page} from "../../domain/services/page-objects/page-object";
import {PAGE_OBJECT_TYPES} from "../../domain/services/page-objects/page-object-types";
import {AuthorizationPage} from "../../domain/services/page-objects/authorization-page";
import {HomePage} from "../../domain/services/page-objects/home-page";
import {ProfilePage} from "../../domain/services/page-objects/profile-page";

export class CustomWorld implements World {
    public static readonly sessionDataMap: Map<string, any> = new Map<string, any>();

    public readonly platformPageMap: Map<symbol, Page> = new Map()
        .set(PAGE_OBJECT_TYPES.AuthorizationPage, new AuthorizationPage())
        .set(PAGE_OBJECT_TYPES.HomePage, new HomePage())
        .set(PAGE_OBJECT_TYPES.ProfilePage, new ProfilePage());
}

setWorldConstructor(CustomWorld);