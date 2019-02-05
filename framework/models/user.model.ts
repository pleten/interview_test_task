export class User {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    supportPin: string;
    isNewsletterEnabled: boolean;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
