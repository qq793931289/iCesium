// import * as Cesium from 'cesium';
// import { mapConfig } from '../constant';

// export class ViewerObject {

//   public viewer: Cesium.Viewer;

//   constructor(viewer: Cesium.Viewer) {

//     this.viewer = viewer;

//     (this.viewer.cesiumWidget.creditContainer as HTMLElement).style.display = 'none';

//     this.init();

//     this.debug();

//   }

//   public debug() {
//     this.viewer.scene.debugShowFramesPerSecond = mapConfig.debug;
//   }

//   public init() {

//     mapConfig.debug && console.log(this.viewer);

//     this.viewer.scene.skyBox && (this.viewer.scene.skyBox.show = false);

//     this.viewer.scene.screenSpaceCameraController.enableTilt = false;
//     this.viewer.scene.screenSpaceCameraController.enableLook = true;

//     this.viewer.scene.screenSpaceCameraController.enableRotate = true;
//     this.viewer.scene.screenSpaceCameraController.enableTranslate = true;
//     this.viewer.scene.screenSpaceCameraController.enableZoom = true;

//     this.viewer.scene.globe.maximumScreenSpaceError = 4 / 3;

//     this.viewer.scene.globe.baseColor = Cesium.Color.BLACK;

//     this.viewer.scene.sun = new Cesium.Sun();
//     this.viewer.scene.sun.show = false;

//     this.viewer.scene.moon = new Cesium.Moon({
//       show: false,
//     });

//     this.addLayer();

//   }

//   public addLayer() {

//   }

//   public addTileMapServiceImageryProvider(url: string, format: string = 'jpg') {
//     const layer = this.viewer.scene.imageryLayers.addImageryProvider(
//       new Cesium.TileMapServiceImageryProvider({
//         url: url,
//         fileExtension: format,
//       }) as any,
//     );
//     layer.brightness = 1.4;
//     layer.saturation = 1.8;
//   }

// }