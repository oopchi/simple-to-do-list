import { getCookie, setCookie } from './util/cookie';

export class User {
    static getCurrentUser(): User | undefined {
        const user = getCookie('user');

        if (user === undefined) return user;

        return JSON.parse(user) as User;
    }

    constructor(private readonly _name: string) {
        setCookie('user', JSON.stringify(this), {
            'max-age': 3600,
        });
    }

    get name() {
        return this._name;
    }
}
