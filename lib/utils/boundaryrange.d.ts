import * as Cesium from 'cesium';
export interface BoundaryRangeProps {
    viewer: Cesium.CesiumWidget;
}
export declare class BoundaryRange {
    viewer: Cesium.CesiumWidget;
    constructor(props: BoundaryRangeProps);
    boundaryByAdcode(adcode?: string | number, Subregion?: boolean): void;
    addDataToGlobe: (features: any[]) => void;
}
