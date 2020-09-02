
import * as Cesium from 'cesium';

import 'cesium/Source/Widgets/widgets.css';

(Cesium.buildModuleUrl as any).setBaseUrl('https://v-edu.org.cn/sre/file/map/cesium/Source');
// (window as any).CESIUM_BASE_URL = 'https://cesium.com/downloads/cesiumjs/releases/1.72/Build/Cesium/';
// (window as any).CESIUM_BASE_URL = 'https://v-edu.org.cn/sre/file/map/cesium';

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzODAwZjJkYS02MmMyLTRhYjctYjZlMy04N2JiNDY5Mjg0M2IiLCJpZCI6MjQ0MTMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODUxOTM5MDN9.ImztRbucAywyYtlbPc2pxo_H4dnMAlOn1SZv2z4bAlU';