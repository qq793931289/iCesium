import * as Cesium from 'cesium';
import { API } from '../../api/api';

// import axios from 'https://unpkg.com/axios/dist/axios.min.js';

export interface BoundaryRangeProps {
  viewer: Cesium.CesiumWidget;
}

export class BoundaryRange {

  public viewer: Cesium.CesiumWidget;

  constructor(props: BoundaryRangeProps) {
    this.viewer = props.viewer;
  }

  public boundaryByAdcode(adcode: string | number = 100000, Subregion: boolean = false) {
    API.cesium.getGeoatlas(adcode, Subregion).then(res => {
      this.addDataToGlobe(res.data.features);
    });
  }

  public addDataToGlobe = (features: any[]) => {
    // console.log(features);
    const instances = [];
    for (let i = 0; i < features.length; i++) {
      for (let j = 0; j < features[i].geometry.coordinates.length; j++) {
        const polygonArr = features[i].geometry.coordinates[j].toString().split(',').map((v: string) => { return Number(v); });
        // console.log(polygonArr, 'polygonArr');
        const polygon = new Cesium.PolygonGeometry({
          polygonHierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray(polygonArr),
          ),
          vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        });
        const geometry = Cesium.PolygonGeometry.createGeometry(polygon);
        instances.push(new Cesium.GeometryInstance({
          geometry: geometry as any,
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({ alpha: 0.4 })),
          },
        }));
      }
    }

    const primitive = new Cesium.Primitive({
      geometryInstances: instances,
      appearance: new Cesium.PerInstanceColorAppearance({ // 为每个instance着色
        translucent: true,
        closed: false,
      }),
      asynchronous: false,  // 确定基元是异步创建还是阻塞直到准备就绪
    });

    this.viewer.scene.primitives.add(primitive);
  }


}