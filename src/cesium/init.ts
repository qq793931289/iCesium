

// import * as Cesium from 'cesium';
// import 'cesium/Source/Widgets/widgets.css';

// const axios = require('axios').default;
// import * as React from 'react';


import * as Cesium from 'cesium';
import 'cesium/Source/Widgets/widgets.css';

// import * as THREE from 'three';
// import axios from 'axios';
// import jsonpAdapter from 'axios-jsonp';
// import jsonp from 'jsonp';

// import { Input } from 'antd';
// import { CoordinateTools } from './cesiumutils/coordinatetools';
// import { API } from '../api/api';
// import { Adcode, AdcodeProps } from './cesiumutils/adcode';
import { Config } from '../config/config';
import { MainMap } from '.';

// const { Search } = Input;

export interface CesiumContainerProps {
  id: string;
}

// @import url(./templates/bucket.css);
// import { Link } from 'react-router-dom';
// (Cesium as any).buildModuleUrl.setBaseUrl('https://cesium.com/downloads/cesiumjs/releases/1.72/Build/Cesium/Source');
(Cesium.buildModuleUrl as any).setBaseUrl('https://v-edu.org.cn/sre/file/map/cesium/Source');
// (window as any).CESIUM_BASE_URL = 'https://cesium.com/downloads/cesiumjs/releases/1.72/Build/Cesium/';
// (window as any).CESIUM_BASE_URL = 'https://v-edu.org.cn/sre/file/map/cesium';

Cesium.Ion.defaultAccessToken =
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ
  qdGkiOiIzODAwZjJkYS02MmMyLTRhYjctYjZlMy04N2JiN
  DY5Mjg0M2IiLCJpZCI6MjQ0MTMsInNjb3BlcyI6WyJhc3IiLC
  JnYyJdLCJpYXQiOjE1ODUxOTM5MDN9.Im
  ztRbucAywyYtlbPc2pxo_H4dnMAlOn1SZv2z4bAlU`;

export class CesiumRun {
  public viewer: Cesium.CesiumWidget;
  public mainMap?: MainMap;

  constructor() {
    this.viewer = new Cesium.CesiumWidget(Config.containerId || 'cesiumContainer', {
      imageryProvider: false as any,
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
    this.init();
    console.log('cesium update 1.0.4');
  }

  public init() {
    this.mainMap = new MainMap(this.viewer);
    // (this.viewer.cesiumWidget.creditContainer as HTMLElement).style.display = 'none'; 
    (this.viewer as any)._innerCreditContainer.style.display = 'none';

    this.viewer.scene.debugShowFramesPerSecond = true;

    this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = 60000000;

    this.viewer.scene.skyBox.show = false;
    this.viewer.scene.sun.show = false;
    this.viewer.scene.moon.show = false;

    // this.viewer.scene.screenSpaceCameraController.enableTilt = false;
    // this.viewer.scene.screenSpaceCameraController.enableLook = true;

    // this.viewer.scene.screenSpaceCameraController.enableRotate = true;
    // this.viewer.scene.screenSpaceCameraController.enableTranslate = true;
    // this.viewer.scene.screenSpaceCameraController.enableZoom = true;

    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(73, 3, 135, 73);

    this.viewer.camera.setView({
      // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
      // fromDegrees()方法，将经纬度和高程转换为世界坐标
      destination: Cesium.Cartesian3.fromDegrees(105.48, 33, 15000000),
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