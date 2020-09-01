import { SvgSprite, IIconManager } from './interfaces';

declare const require: {
    /**
     * The definition for require.context of webpack
     * 
     * @param {string} dir scan dir
     * @param {boolean} includeSubdir
     * @param {RegExp} [filter]
     */
    context(dir: string, includeSubdir: boolean, filter?: RegExp): {
        (s: string): {
            default?: SvgSprite;
        };
        keys(): string[];
    };
};

const _list = new Map<string, SvgSprite>();
const extractName = new RegExp('/(([A-Za-z0-9]+/)?[A-Za-z0-9\._-]+)\.svg');
const req = require.context('./svgs/', true, /\.svg$/);
req.keys().forEach((mod) => {
    const v = req(mod);
    const names = extractName.exec(mod);
    if (names) {
        if (v && v.default) {
            _list.set(names[1], v.default);
        }
    }
});

const defaultProvider = {
    getIcon: function (iconName: string): SvgSprite | undefined {
        return _list.get(iconName);
    },
    allKeys: function () {
        return _list.keys();
    },
};

function loadDefaultIcons(manager: IIconManager) {
    manager.addProvider(defaultProvider);
}

export { loadDefaultIcons };

export default loadDefaultIcons;