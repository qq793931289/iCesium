import * as React from 'react';
import { BaseContainer } from '../';
import { Earth } from '../..';
import { BoundaryRange } from '../../';

export class BoundaryRangeComponent extends React.Component {

  private _earth?: Earth;
  public _boundaryrange?: BoundaryRange;

  public componentDidMount() {
    this._earth = new Earth();
    this._boundaryrange = new BoundaryRange({
      viewer: this._earth.viewer,
    });
    // this.boundaryByAdcode(100000, true);
  }

  public boundaryByAdcode(adcode: string | number = 100000, Subregion: boolean = false) {
    console.log(adcode, Subregion);
    // this._boundaryrange?.boundaryByAdcode(adcode, Subregion);
  }

  public render() {
    return (
      <BaseContainer />
    );
  }

}