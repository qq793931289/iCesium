
import * as Cesium from 'cesium';
import './config';
import { Config, EarthMap } from '../..';

export class Earth {
  public viewer: Cesium.CesiumWidget;
  public earthMap: EarthMap;

  constructor() {
    console.log('load earth');
    this.viewer = new Cesium.CesiumWidget(Config.containerId || 'cesiumContainer', {
      // imageryProvider: false as any,
      // selectionIndicator: false,
      // animation: false,
      // timeline: false,
      // fullscreenButton: false,
      // infoBox: false,
      // homeButton: false,
      // baseLayerPicker: false,
      // navigationHelpButton: false,
      // geocoder: false,
      // sceneModePicker: false,
      scene3DOnly: true,
      requestRenderMode: true,
      maximumRenderTimeChange: Infinity,
    });

    this.earthMap = new EarthMap(this.viewer);

    this.init();

    console.log('cesium update 1.0.5');
  }

  public init() {

    // (this.viewer.cesiumWidget.creditContainer as HTMLElement).style.display = 'none'; 
    (this.viewer as any)._innerCreditContainer.style.display = 'none';

    this.viewer.scene.debugShowFramesPerSecond = true;

    this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = 60000000;

    this.viewer.scene.skyBox.show = false;
    this.viewer.scene.sun.show = false;
    this.viewer.scene.moon.show = false;

    this.viewer.scene.backgroundColor = new Cesium.Color(0, 0, 0, 0);
    this.viewer.scene.skyAtmosphere.show = false;
    this.viewer.scene.postProcessStages.fxaa.enabled = true;

    // this.viewer.scene.screenSpaceCameraController.enableTilt = false;
    // this.viewer.scene.screenSpaceCameraController.enableLook = true;
    // this.viewer.scene.screenSpaceCameraController.enableRotate = true;
    // this.viewer.scene.screenSpaceCameraController.enableTranslate = true;
    // this.viewer.scene.screenSpaceCameraController.enableZoom = true;

    this.viewer.camera.flyTo({
      duration: 3,
      destination: Cesium.Cartesian3.fromDegrees(105.48, 33, 30000000),
      // destination: Cesium.Rectangle.fromDegrees(73, 3, 135, 125),
      // destination: Cesium.Rectangle.fromDegrees(73, 3, 135, 54),
      // orientation: new Cesium.HeadingPitchRange(0, -1.57, 0),
      // orientation: {
      //   // 指向
      //   heading: Cesium.Math.toRadians(0),
      //   // 视角
      //   pitch: Cesium.Math.toRadians(-90),
      //   roll: 0,
      // },
    });
  }
}