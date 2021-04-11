import * as React from 'react';
import 'antd/dist/antd.css';
import './style';
export interface CesiumContainerProps {
    ref: any;
}
export declare class AddressLocationComponent extends React.Component {
    private _earth?;
    myInput: React.RefObject<unknown>;
    ref: any;
    private _addressLocation?;
    constructor(props: any);
    getContainer(): React.RefObject<unknown>;
    componentDidMount(): void;
    search(input: string): void;
    private _search;
    handleClick(): void;
    render(): JSX.Element;
}
