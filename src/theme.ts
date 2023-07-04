type ThemeOption = 'dark' | 'light';

function isValidThemeOption(candidate: string): candidate is ThemeOption {
    return ['dark', 'light'].includes(candidate);
}

class _Theme {
    static readonly eventKey = 'theme';
    static readonly storageKey = 'theme';
    static readonly classKey = 'dark';
    static readonly rootHTMLElement = 'html';
}

export class Theme {
    static useSystemTheme() {
        localStorage.removeItem(_Theme.storageKey);
        document.dispatchEvent(
            new CustomEvent(_Theme.eventKey, {
                detail: null,
                bubbles: true,
            })
        );
    }

    static setTheme(themeOption: ThemeOption) {
        try {
            localStorage.setItem(_Theme.storageKey, themeOption);
            document.dispatchEvent(
                new CustomEvent(_Theme.eventKey, {
                    detail: themeOption,
                    bubbles: true,
                })
            );
        } catch (e) {
            console.log(`cannot reflect changes on new theme: ${e}`);
        }
    }

    static getTheme(): ThemeOption {
        return document
            .querySelector(_Theme.rootHTMLElement)
            ?.classList.contains('dark')
            ? 'dark'
            : 'light' ?? 'light';
    }

    static toggleTheme(): ThemeOption {
        const newTheme = Theme.getTheme() === 'dark' ? 'light' : 'dark';
        Theme.setTheme(newTheme);

        return newTheme;
    }

    private readonly _mediaQuery: string;
    private readonly _mediaQueryList: MediaQueryList;

    private _forcedTheme: ThemeOption | null = null;

    constructor() {
        this._mediaQuery = '(prefers-color-scheme: dark)';
        this._mediaQueryList = window.matchMedia(this._mediaQuery);

        this._initTheme();
        this._listenThemeChanges();
    }

    private _initTheme() {
        this._forcedTheme = localStorage.getItem(
            _Theme.storageKey
        ) as ThemeOption | null;
        if (this._forcedTheme && this._forcedTheme === 'dark') {
            this._setTheme(true);
        }

        this._setTheme(this._getSystemTheme(this._mediaQueryList));
    }

    private _listenThemeChanges() {
        this._mediaQueryList.addEventListener(
            'change',
            this._onSystemThemeChange.bind(this)
        );

        document.addEventListener(
            _Theme.eventKey,
            this._onLocalThemeChange.bind(this)
        );
    }

    private _onLocalThemeChange(e: CustomEventInit<ThemeOption>) {
        if (e.detail === undefined) return;

        this._forcedTheme = e.detail;

        if (this._forcedTheme) {
            this._setTheme(this._forcedTheme === 'dark');
            return;
        }

        this._setTheme(this._getSystemTheme(this._mediaQueryList));
    }

    private _onSystemThemeChange(e: MediaQueryListEvent) {
        if (this._forcedTheme) return;

        this._setTheme(this._getSystemTheme(e));
    }

    private _getSystemTheme(e: { matches: boolean }): boolean {
        return e.matches;
    }

    private _setTheme(isDark: boolean) {
        document
            .querySelector(_Theme.rootHTMLElement)
            ?.classList.toggle(_Theme.classKey, isDark);
    }
}
