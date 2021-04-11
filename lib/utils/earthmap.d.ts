import * as Cesium from 'cesium';
export declare class EarthMap {
    viewer: Cesium.CesiumWidget;
    private _googleMap?;
    private _mapboxMap?;
    private _nightMap?;
    constructor(viewer: Cesium.CesiumWidget);
    hideMap(): void;
    googleMapShow(status?: boolean): void;
    mapboxMapShow(status?: boolean): void;
    nightMapShow(status?: boolean): void;
    addImageryProvider: (provider: any) => Cesium.ImageryLayer;
    _googleMapInit: () => void;
    private _mapboxMapInit;
    private _nightMapInit;
}
