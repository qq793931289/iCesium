// import * as Cesium from 'cesium';
// import { Cartesian3, Rectangle, mapConfig, Cartesian } from '..';

// export class Camera {

//     private _camera: Cesium.Camera;

//     constructor(viewer: Cesium.Viewer) {

//         this._camera = viewer.camera;

//         return this;

//     }

//     public get camera() {
//         return this._camera;
//     }

//     public cameraUpdate(position: Cartesian3) {

//         const { longitude, latitude } = Cartesian.offset2(position.longitude, position.latitude);

//         this._camera.flyTo({
//             destination: Cesium.Cartesian3.fromDegrees(
//                 longitude,
//                 latitude,
//                 mapConfig.fireHeight,
//             ),
//         });
//     }

//     public cameraRectangleUpdate(option: Rectangle) {
//         const { longitude: beginLongitude, latitude: beginLatitude } = Cartesian.offset2(option.beginLongitude, option.beginLatitude);
//         const { longitude: endLongitude, latitude: endLatitude } = Cartesian.offset2(option.endLongitude, option.endLatitude);
//         console.log(
//             beginLongitude, beginLatitude,
//             endLongitude, endLatitude,
//         );
//         this._camera.flyTo({
//             destination: Cesium.Rectangle.fromDegrees(
//                 beginLongitude, beginLatitude,
//                 endLongitude, endLatitude,
//             ),
//         });
//     }

// }