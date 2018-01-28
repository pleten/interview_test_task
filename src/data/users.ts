export interface IUser {
    email: string
    password: string
}

export const users: {
    valid: IUser
    notregistered: IUser
    invalidemail: IUser
} = {
    valid: {
        email: 'ssls.automation+5@gmail.com',
        password: '123456'
    },
    notregistered: {
        email: 'notregistered@box.net',
        password: 'trombone'
    },
    invalidemail: {
        email: 'test@@test.com',
        password: 'hurma'
    }
}
