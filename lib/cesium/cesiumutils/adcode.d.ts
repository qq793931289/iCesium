import * as Cesium from 'cesium';
export interface AdcodeProps {
    viewer: Cesium.CesiumWidget;
}
export declare class Adcode {
    viewer: Cesium.CesiumWidget;
    constructor(props: AdcodeProps);
    getData(): void;
    addDataToGlobe: (features: any[]) => void;
}
