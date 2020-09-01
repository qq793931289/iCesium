import * as React from 'react';
import { BaseContainer } from '../ui/base';
import { CesiumRun } from '../..';
import { BoundaryRange } from '../../cesium/cesiumutils/boundaryrange';

export class BoundaryRangeComponent extends React.Component {

  private _iCesium?: CesiumRun;
  public _boundaryrange?: BoundaryRange;

  public componentDidMount() {
    this._iCesium = new CesiumRun();
    this._boundaryrange = new BoundaryRange({
      viewer: this._iCesium.viewer,
    });
    this.boundaryByAdcode(100000, true);
  }

  public boundaryByAdcode(adcode: string | number = 100000, Subregion: boolean = false) {
    this._boundaryrange?.boundaryByAdcode(adcode, Subregion);
  }

  public render() {
    return (
      <BaseContainer />
    );
  }

}