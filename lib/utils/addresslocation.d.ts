import * as Cesium from 'cesium';
export interface AddressLocationProps {
    viewer: Cesium.CesiumWidget;
}
export declare class AddressLocation {
    viewer: Cesium.CesiumWidget;
    private _labels;
    private _points;
    constructor(props: AddressLocationProps);
    search(input: string): Promise<any>;
    clear(): void;
    showPoint(res: any): void;
}
