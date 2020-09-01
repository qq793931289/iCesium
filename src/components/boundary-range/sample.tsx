import * as React from 'react';
import { BoundaryRangeComponent } from '.';
import './style';

function CesiumSample() {
  return (
    <BoundaryRangeComponent />
  );
}

export default {
  order: 19,
  comp: CesiumSample,
};