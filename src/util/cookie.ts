// returns the cookie with the given name,
// or undefined if not found
export function getCookie(name: string): string | undefined {
    let matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                '=([^;]*)'
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
    name: string,
    value: string,
    options: {
        [key: string]: unknown;
    } = {}
): void {
    options = {
        path: '/',
        // add other defaults here if necessary
        ...options,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
        encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (const optionKey in options) {
        updatedCookie += '; ' + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
    setCookie(name, '', {
        'max-age': -1,
    });
}
