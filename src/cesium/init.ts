

import 'cesium/Source/Widgets/widgets.css';

// const axios = require('axios').default;
// import * as React from 'react';
import * as Cesium from 'cesium';
// import * as THREE from 'three';
// import axios from 'axios';
// import jsonpAdapter from 'axios-jsonp';
// import jsonp from 'jsonp';

// import { Input } from 'antd';
import { CoordinateTools } from './cesiumutils/coordinatetools';
import { API } from '../api/api';
import { Adcode, AdcodeProps } from './cesiumutils/adcode';

// const { Search } = Input;

export interface CesiumContainerProps {
  id: string;
}

// @import url(./templates/bucket.css);
// import { Link } from 'react-router-dom';
// (Cesium as any).buildModuleUrl.setBaseUrl('https://cesium.com/downloads/cesiumjs/releases/1.72/Build/Cesium/Source');
// (window as any).CESIUM_BASE_URL = 'https://cesium.com/downloads/cesiumjs/releases/1.72/Build/Cesium/';
(window as any).CESIUM_BASE_URL = 'https://v-edu.org.cn/sre/file/map/cesium';



Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzODAwZjJkYS02MmMyLTRhYjctYjZlMy04N2JiNDY5Mjg0M2IiLCJpZCI6MjQ0M' +
  'TMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODUxOTM5MDN9.ImztRbucAywyYtlbPc2pxo_H4dnMAlOn1SZv2z4bAlU';

export class CesiumContainer {
  public viewer?: Cesium.CesiumWidget;
  public googleMap?: Cesium.UrlTemplateImageryProvider;
  public mapboxMap?: Cesium.MapboxStyleImageryProvider;
  constructor(props: CesiumContainerProps) {
    this.init(props);

    console.log('cesium update 1.0.3');

  }

  public componentDidMount() {

  }

  public init(props: CesiumContainerProps) {
    // console.log(Cesium, THREE);
    // console.log(this.props.match.params);
    // console.log(this.props.history.location.state);
    this.viewer = new Cesium.CesiumWidget(props.id || 'cesiumContainer', {
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

      // imageryProvider : new Cesium.WebMapTileServiceImageryProvider({
      //     url: 'http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles',
      //     layer: 'tdtVecBasicLayer',
      //     style: 'default',
      //     format: 'image/jpeg',
      //     tileMatrixSetID: 'GoogleMapsCompatible',
      //     show: false
      // })
    });

    // (this.viewer.cesiumWidget.creditContainer as HTMLElement).style.display = "none";
    this.viewer.scene.debugShowFramesPerSecond = true;

    this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = 30000000;

    this.viewer.scene.skyBox && (this.viewer.scene.skyBox.show = false);
    this.viewer.scene.sun = new Cesium.Sun();
    this.viewer.scene.sun.show = false;

    this.viewer.scene.moon = new Cesium.Moon({
      show: false,
    });

    // this.viewer.scene.screenSpaceCameraController.enableTilt = false;
    // this.viewer.scene.screenSpaceCameraController.enableLook = true;

    // this.viewer.scene.screenSpaceCameraController.enableRotate = true;
    // this.viewer.scene.screenSpaceCameraController.enableTranslate = true;
    // this.viewer.scene.screenSpaceCameraController.enableZoom = true;

    this._googleMap();

    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(113.2759952545166, 23.117055306224895, 114.0, 24.0);

    this.viewer.camera.setView({
      // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
      // fromDegrees()方法，将经纬度和高程转换为世界坐标
      destination: Cesium.Cartesian3.fromDegrees(113.48, 23.00, 150000.0),
      orientation: {
        // 指向
        // heading: Cesium.Math.toRadians(90),
        // 视角
        // pitch: Cesium.Math.toRadians(-90),
        // roll: 0.0
      }
    });
    this.initAdcode();
  };

  public initAdcode() {

    new Adcode({
      viewer: this.viewer,
    } as AdcodeProps);


  }

  // public mapboxMapStatus(status: boolean = true) {
  //   this.mapboxMap.show = status;
  // }

  public _googleMap = () => {
    var esriImageryProvider = new Cesium.ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    });
    this.viewer!.imageryLayers.addImageryProvider(esriImageryProvider);

  };


  public _mapboxMap = () => {
    const imageryProvider = new Cesium.MapboxStyleImageryProvider({
      url: 'https://api.mapbox.com/styles/v1',
      username: 'qq793931289',
      styleId: 'ckatbx8pa43341insqhces8m3',
      accessToken:
        'pk.eyJ1IjoicXE3OTM5MzEyODkiLCJhIjoiY2s5M3oxbmFzMDdrczNlbXpibDI0bTQxYiJ9.GuZhkGBTu6vkisVE7CKGeA',
      scaleFactor: true,
      // hasAlphaChannel: false,
      // tileHeight: 256,
      // tileWidth: 256,
      // tilesize: 256,
      // fileExtension: 'jpeg',
      // format: 'jpg',
    });
    this.mapboxMap = this!.viewer!.imageryLayers.addImageryProvider(
      imageryProvider,
    ) as any;
    // this.mapboxMapStatus(false);
  };

  public async search(input: string): Promise<any> {

    this.viewer?.scene.primitives.removeAll();

    // this.viewer?.scene.primitives.add(new Cesium.LabelCollection());
    const labels = this.viewer!.scene.primitives.add(new Cesium.LabelCollection());


    // var center = Cesium.Cartesian3.fromDegrees(113.59777, 24.03883);
    // labels.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);

    // var l = labels.add({
    //   show: true,
    //   // position: Cesium.Cartesian3.ZERO,
    //   position: new Cesium.Cartesian3(-10000.0, 0.0, 0.0),
    //   text: '广州市',
    //   font: '30px sans-serif',
    //   fillColor: Cesium.Color.WHITE,
    //   outlineColor: Cesium.Color.BLACK,
    //   outlineWidth: 1.0,
    //   showBackground: false,
    //   backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),
    //   backgroundPadding: new Cesium.Cartesian2(7, 5),
    //   style: Cesium.LabelStyle.FILL,
    //   pixelOffset: Cesium.Cartesian2.ZERO,
    //   eyeOffset: Cesium.Cartesian3.ZERO,
    //   horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
    //   verticalOrigin: Cesium.VerticalOrigin.BASELINE,
    //   scale: 1.0,
    //   translucencyByDistance: undefined,
    //   pixelOffsetScaleByDistance: undefined,
    //   heightReference: Cesium.HeightReference.NONE,
    //   distanceDisplayCondition: undefined
    // });


    const points = this.viewer!.scene.primitives.add(new Cesium.PointPrimitiveCollection());
    // points.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);

    API.cesium.baiduMap(input).then((res: any) => {
      if (res.results.length == 0 || !res.results[0] || !res.results[0].location || !res.results[0].location.lng) {
        alert('tips:未找到位置!');
        return;
      } else {
        res.results.map((point: any) => {
          const realPoint = CoordinateTools.getWgs84xy(point.location.lng, point.location.lat);
          points.add({
            position: Cesium.Cartesian3.fromDegrees(realPoint[0], realPoint[1], 10),
            pixelSize: 10,
            color: Cesium.Color.RED.withAlpha(0.8),
          });
          labels.add({
            position: Cesium.Cartesian3.fromDegrees(realPoint[0], realPoint[1], 10),
            text: point.name,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.TOP,
            scaleByDistance: new Cesium.NearFarScalar(10.0, 0.5, 5000, 0.5),
            fillColor: Cesium.Color.YELLOW.withAlpha(0.8),
          });
          this.viewer!.scene.requestRender();
        })
        const poi = CoordinateTools.getWgs84xy(res.results[0].location.lng, res.results[0].location.lat);
        this.viewer?.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(poi[0], poi[1], 1000.0),
          orientation: new Cesium.HeadingPitchRange(0, -1.57, 1000),
          duration: 3,
          maximumHeight: 50000,
        });
      }
    })
  }

  // public render() {
  //   const style = { height: '100vh' };
  //   return (
  //     <div
  //       id='cesiumContainer'
  //       style={style}
  //     >
  //       <div style={{ position: 'relative', top: 50, left: 150, zIndex: 1 }}>
  //         <Search
  //           placeholder="百度地图API搜索"
  //           onSearch={(value: string) => {
  //             this.search(value);
  //           }}
  //           style={{ width: 512, position: 'absolute', top: 0, left: 0, zIndex: 1 }}
  //           enterButton
  //         />
  //       </div>
  //     </div>
  //   );
  // }

}