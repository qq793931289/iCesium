import { IIconManager, SvgSprite, IIconProvider } from './interfaces';
import defulatSvgSprite from './svgs/file.svg';

const defaultProvider = {
    getIcon: function (_iconName: string): SvgSprite {
        return defulatSvgSprite;
    },
    allKeys: function () {
        return ['file'];
    },
};

export class DefaultIconManager implements IIconManager {
    private _providers: IIconProvider[] = [];
    private _default: IIconProvider;
    constructor(provider: IIconProvider) {
        this._default = provider;
    }
    public getIcon(iconName: string): SvgSprite {
        let ret;
        this._providers.some(provider => {
            ret = provider.getIcon(iconName);
            return !!ret;
        });
        return ret || this._default.getIcon(iconName) || defulatSvgSprite;
    }
    public addProvider(...providers: IIconProvider[]): void {
        this._providers.push(...providers);
    }
    public allKeys() {
        const list = new Set<string>();
        this._providers.forEach(provider => {
            for (const key of provider.allKeys()) {
                list.add(key);
            }
        });
        return list;
    }
}

export const Icons = new DefaultIconManager(defaultProvider);
