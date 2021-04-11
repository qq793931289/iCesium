import * as React from 'react';
import { SvgSprite } from '../../icons/interfaces';
export { SvgSprite };
export interface SvgIconProps {
    className?: string;
    style?: React.CSSProperties;
    tooltip?: string;
    onClick?: React.MouseEventHandler<any>;
    icon: SvgSprite | string;
}
export declare class SvgIcon extends React.PureComponent<SvgIconProps> {
    render(): JSX.Element;
}
