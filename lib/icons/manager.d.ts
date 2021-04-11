import { IIconManager, SvgSprite, IIconProvider } from './interfaces';
export declare class DefaultIconManager implements IIconManager {
    private _providers;
    private _default;
    constructor(provider: IIconProvider);
    getIcon(iconName: string): SvgSprite;
    addProvider(...providers: IIconProvider[]): void;
    allKeys(): Set<string>;
}
export declare const Icons: DefaultIconManager;
