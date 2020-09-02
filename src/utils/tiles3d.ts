import * as Cesium from 'cesium';

export interface Tiles3DProps {
  viewer: Cesium.CesiumWidget;
}

export class Tiles3D {

  public viewer: Cesium.CesiumWidget;

  constructor(props: Tiles3DProps) {
    this.viewer = props.viewer;

    this.viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(90382),
      }),
    );
  }

}