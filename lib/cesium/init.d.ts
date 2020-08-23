import 'cesium/Source/Widgets/widgets.css';
import * as Cesium from 'cesium';
export interface CesiumContainerProps {
    id: string;
}
export declare class CesiumContainer {
    viewer?: Cesium.CesiumWidget;
    googleMap?: Cesium.UrlTemplateImageryProvider;
    mapboxMap?: Cesium.MapboxStyleImageryProvider;
    constructor(props: CesiumContainerProps);
    componentDidMount(): void;
    init(props: CesiumContainerProps): void;
    private _googleMap;
    _mapboxMap: () => void;
    search(input: string): Promise<any>;
}
