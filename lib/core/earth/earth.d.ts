import * as Cesium from 'cesium';
import './config';
import { EarthMap } from '../..';
export declare class Earth {
    viewer: Cesium.CesiumWidget;
    earthMap: EarthMap;
    constructor();
    init(): void;
}
