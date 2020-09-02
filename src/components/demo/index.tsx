//use demo 
// import * as Cesium from 'cesium';
import * as React from 'react';
import { BaseContainer, Earth } from '../..';

export class DemoContainer extends React.Component {
  public _earth?: Earth;

  public componentDidMount() {
    this._earth = new Earth();

    // this._earth.earthMap.googleMapShow(true);
    this._earth.earthMap.nightMapShow(true);

    // this._earth.viewer.scene.camera.setView({
    //   destination: new Cesium.Cartesian3(
    //     1331419.302230775,
    //     -4656681.5022043325,
    //     4136232.6465900405,
    //   ),
    //   orientation: new Cesium.HeadingPitchRoll(
    //     6.032455545102689,
    //     -0.056832496140112765,
    //     6.282360923090216,
    //   ),
    //   endTransform: Cesium.Matrix4.IDENTITY,
    // });

  }

  public render() {
    return (
      <BaseContainer />
    );
  }
}