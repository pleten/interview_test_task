export namespace Type {
    export interface TestUser {
        readonly email: string;
        readonly password: string;
    }

    export interface UserProfile {
        name: string;
        email: string;
        password: string;
        phone: string;
        address: string;
        supportPin: string;
        newsletter: boolean;
    }

    export type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp? P : never}[keyof T];
}
