import * as React from 'react';
import { SvgSprite } from '../../icons/interfaces';
import { Icons } from '../..';

export { SvgSprite };
// export interface SvgSprite {
//   id: string;
//   viewBox: string;
//   url: string;
// }

export interface SvgIconProps {
  className?: string;
  style?: React.CSSProperties;
  tooltip?: string;
  onClick?: React.MouseEventHandler<any>;
  icon: SvgSprite | string;
}

export class SvgIcon extends React.PureComponent<SvgIconProps> {
  public render() {
    const { className, icon, ...restProps } = this.props;
    const iconObj = typeof icon === 'string' ? Icons.getIcon(icon) : icon;

    return (
      <svg className={className} {...restProps}>
        <use xlinkHref={iconObj.url || ('#' + iconObj.id)} />
      </svg>
    );
  }
}
