import * as React from 'react';
import { AddressLocationComponent } from '.';
import './style';

function CesiumSample() {
  return (
    <AddressLocationComponent />
  );
}

export default {
  order: 20,
  comp: CesiumSample,
};