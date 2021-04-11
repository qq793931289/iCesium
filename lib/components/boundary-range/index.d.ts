import * as React from 'react';
import { BoundaryRange } from '../../';
export declare class BoundaryRangeComponent extends React.Component {
    private _earth?;
    _boundaryrange?: BoundaryRange;
    componentDidMount(): void;
    boundaryByAdcode(adcode?: string | number, Subregion?: boolean): void;
    render(): JSX.Element;
}
