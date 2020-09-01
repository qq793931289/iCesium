
export interface SvgSprite {
  id: string;
  url: string;
}

export interface IIconManager {
  getIcon(iconName: string): SvgSprite;
  addProvider(...providers: IIconProvider[]): void;
  allKeys(): Iterable<string>;
}

export interface IIconProvider {
  getIcon(iconName: string): SvgSprite | undefined;
  allKeys(): Iterable<string>;
}
