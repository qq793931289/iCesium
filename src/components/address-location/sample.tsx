import * as React from 'react';
import { AddressLocationComponent } from '.';
import './style';

function CesiumSample() {
  return (
    <AddressLocationComponent />
  );
}

export default {
  order: 1,
  comp: CesiumSample,
};