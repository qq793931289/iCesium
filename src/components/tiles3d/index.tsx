//use demo 
import * as Cesium from 'cesium';
import * as React from 'react';
import { BaseContainer, Earth, Tiles3D } from '../..';

export class Tiles3DComponent extends React.Component {
  public _earth?: Earth;
  public _tiles3D?: Tiles3D;

  public componentDidMount() {
    this._earth = new Earth();

    this._tiles3D = new Tiles3D({
      viewer: this._earth.viewer,
    });

    this._earth.earthMap.googleMapShow(true);

    this._earth.viewer.terrainProvider = Cesium.createWorldTerrain();

  }

  public render() {
    return (
      <BaseContainer />
    );
  }
}