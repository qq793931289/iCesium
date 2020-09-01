import * as Cesium from 'cesium';
import axios from 'axios';

// import axios from 'https://unpkg.com/axios/dist/axios.min.js';

export interface AdcodeProps {
  viewer: Cesium.CesiumWidget;
}

export class Adcode {

  public viewer: Cesium.CesiumWidget;

  constructor(props: AdcodeProps) {
    this.viewer = props.viewer;
    this.getData();
  }


  public getData() {

    var urlpath = "https://v-edu.org.cn/sre/file/map/geoatlas/100000_full.json";
    axios.get(urlpath, {
      params: {
        // "参数名": "传递的参数"
      }
    })
      .then((res) => {
        // console.log("返回结果==>", res);

        this.addDataToGlobe(res.data.features);

      })
      .catch(function (error) {
        console.log(error);
      })
  }

  public addDataToGlobe = (features: any[]) => {
    // console.log(features);
    const instances = [];
    for (let i = 0; i < features.length; i++) {
      for (let j = 0; j < features[i].geometry.coordinates.length; j++) {
        const polygonArr = features[i].geometry.coordinates[j].toString().split(',').map((v: string) => { return Number(v) });
        // console.log(polygonArr, 'polygonArr');
        const polygon = new Cesium.PolygonGeometry({
          polygonHierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray(polygonArr)
          ),
          vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
        });
        const geometry = Cesium.PolygonGeometry.createGeometry(polygon);
        instances.push(new Cesium.GeometryInstance({
          geometry: geometry as any,
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({ alpha: 0.2 })),
          },
        }));
      }
    }

    const primitive = new Cesium.Primitive({
      geometryInstances: instances,
      appearance: new Cesium.PerInstanceColorAppearance({ // 为每个instance着色
        translucent: true,
        closed: false
      }),
      asynchronous: false,  // 确定基元是异步创建还是阻塞直到准备就绪
    });

    this.viewer.scene.primitives.add(primitive);
  }


}