
//use demo 

import React from 'react';
import { BaseContainer } from '../components/ui/base';
import { CesiumRun } from './init';

export class CesiumContainer extends React.Component {
  public _run?: CesiumRun;

  public componentDidMount() {
    this._run = new CesiumRun();
  }

  public render() {
    return (
      <BaseContainer />
    );
  }

}