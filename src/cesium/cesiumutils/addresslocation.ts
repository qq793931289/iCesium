
import * as Cesium from 'cesium';
import { API } from '../../api/api';
import { CoordinateTools } from './coordinatetools';
import { message } from 'antd';

export interface AddressLocationProps {
  viewer: Cesium.CesiumWidget;
}

export class AddressLocation {
  public viewer: Cesium.CesiumWidget;
  private _labels: Cesium.LabelCollection;
  private _points: Cesium.PointPrimitiveCollection;

  constructor(props: AddressLocationProps) {
    this.viewer = props.viewer;
    this._labels = this.viewer!.scene.primitives.add(new Cesium.LabelCollection());
    this._points = this.viewer!.scene.primitives.add(new Cesium.PointPrimitiveCollection());
    // points.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
  }

  public async search(input: string): Promise<any> {

    // this.viewer?.scene.primitives.add(new Cesium.LabelCollection());
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

    API.cesium.getPoint(input).then((res: any) => {
      if (res.results.length === 0 || !res.results[0] || !res.results[0].location || !res.results[0].location.lng) {
        message.warning('未找到位置');
        return;
      } else {
        this.clear();
        this.showPoint(res);
      }
    });

  }

  public clear() {
    // this.viewer?.scene.primitives.removeAll();
    this._labels.removeAll();
    this._points.removeAll();
  }

  public showPoint(res: any) {
    res.results.map((point: any) => {
      const realPoint = CoordinateTools.getWgs84xy(point.location.lng, point.location.lat);
      this._points.add({
        position: Cesium.Cartesian3.fromDegrees(realPoint[0], realPoint[1], 10),
        pixelSize: 10,
        color: Cesium.Color.RED.withAlpha(0.8),
      });
      this._labels.add({
        position: Cesium.Cartesian3.fromDegrees(realPoint[0], realPoint[1], 10),
        text: point.name,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        scaleByDistance: new Cesium.NearFarScalar(10, 0.5, 5000, 0.5),
        fillColor: Cesium.Color.YELLOW.withAlpha(0.8),
      });
      this.viewer!.scene.requestRender();
    });

    const poi = CoordinateTools.getWgs84xy(res.results[0].location.lng, res.results[0].location.lat);

    this.viewer?.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(poi[0], poi[1], 1000),
      orientation: new Cesium.HeadingPitchRange(0, -1.57, 1000),
      duration: 3,
      maximumHeight: 50000,
    });
  }
}