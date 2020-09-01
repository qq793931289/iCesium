import * as Cesium from 'cesium';

export class MainMap {
  public viewer: Cesium.CesiumWidget;
  public _googleMap?: Cesium.ImageryLayer;
  public _mapboxMap?: Cesium.ImageryLayer;

  constructor(viewer: Cesium.CesiumWidget) {
    this.viewer = viewer;
    this._googleMapInit();
    this._mapboxMapInit();
    this.googleMapStatus(true);
  }

  public googleMapStatus(status: boolean = false) {
    this._googleMap!.show = status;
  }

  public mapboxMapStatus(status: boolean = false) {
    this._mapboxMap!.show = status;
  }

  private _googleMapInit = () => {
    const esriImageryProvider = new Cesium.ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
    });
    this._googleMap = this.viewer.imageryLayers.addImageryProvider(esriImageryProvider);
    this.googleMapStatus(false);
  }

  private _mapboxMapInit = () => {
    const imageryProvider = new Cesium.MapboxStyleImageryProvider({
      url: 'https://api.mapbox.com/styles/v1',
      username: 'vtouch',
      styleId: 'ckdzt6e390rjs19n1dkby0tqn',
      accessToken: 'pk.eyJ1IjoidnRvdWNoIiwiYSI6ImNrZHpzM2s1NDJvbXQyem55ZnN2cHlpb3UifQ.e2BerKfmtTa0dYmmXI_UQw',
      scaleFactor: true,
      // hasAlphaChannel: false,
      // tileHeight: 256,
      // tileWidth: 256,
      tilesize: 256,
      // fileExtension: "jpeg",
      // format: 'jpg',
    });
    this._mapboxMap = this.viewer.imageryLayers.addImageryProvider(imageryProvider);
    this.mapboxMapStatus(false);
  }
}


// imageryProvider : new Cesium.WebMapTileServiceImageryProvider({
//     url: 'http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles',
//     layer: 'tdtVecBasicLayer',
//     style: 'default',
//     format: 'image/jpeg',
//     tileMatrixSetID: 'GoogleMapsCompatible',
//     show: false
// })