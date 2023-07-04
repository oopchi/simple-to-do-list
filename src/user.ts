import { getCookie } from './util/cookie';

export class User {
    static getCurrentUser(): User | undefined {
        const user = getCookie('user');

        if (!user) return user;

        return JSON.parse(user) as User;
    }
}
