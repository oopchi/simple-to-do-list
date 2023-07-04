import { getCookie, setCookie } from './util/cookie';

export abstract class User {
    constructor(private readonly _name: string) {
        setCookie('user', JSON.stringify(this), {
            'max-age': 3600,
        });
    }

    static getCurrentUser(): User | undefined {
        const user = getCookie('user');

        if (user === undefined) return user;

        return JSON.parse(user) as User;
    }

    get name() {
        return this._name;
    }
}

export function newUser(name: string): User {
    return new DefaultUser(name);
}

export class DefaultUser extends User {
    constructor(_name: string) {
        super(_name);
    }
}
