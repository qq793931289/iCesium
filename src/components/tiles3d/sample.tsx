import * as React from 'react';
import { Tiles3DComponent } from '.';
// import './style';

function CesiumSample() {
  return (
    <Tiles3DComponent />
  );
}

export default {
  order: 18,
  comp: CesiumSample,
};