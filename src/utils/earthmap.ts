import * as Cesium from 'cesium';

export class EarthMap {
  public viewer: Cesium.CesiumWidget;
  private _googleMap?: Cesium.ImageryLayer;
  private _mapboxMap?: Cesium.ImageryLayer;
  private _nightMap?: Cesium.ImageryLayer;

  constructor(viewer: Cesium.CesiumWidget) {
    this.viewer = viewer;
    // this._googleMapInit();
    this._mapboxMapInit();
    this._nightMapInit();

    // this.googleMapShow(true);
  }

  public hideMap() {
    // this.googleMapShow(false);
    // this.mapboxMapShow(false);
    // this.nightMapShow(false);
  }

  public googleMapShow(status: boolean = false) {
    this.hideMap();
    this._googleMap!.show = status;
  }

  public mapboxMapShow(status: boolean = false) {
    this.hideMap();
    this._mapboxMap!.show = status;
  }

  public nightMapShow(status: boolean = false) {
    this.hideMap();
    this._nightMap!.show = status;
  }

  public addImageryProvider = (provider: any) => {
    return this.viewer.imageryLayers.addImageryProvider(provider);
  }

  public _googleMapInit = () => {
    const esriImageryProvider = new Cesium.ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
    });
    this._googleMap = this.viewer.imageryLayers.addImageryProvider(esriImageryProvider);
    this.googleMapShow(false);
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
    this.mapboxMapShow(false);
  }

  private _nightMapInit() {
    this._nightMap = this.viewer.imageryLayers.addImageryProvider(
      new Cesium.IonImageryProvider({ assetId: 3812 }),
    );
    this.nightMapShow(false);
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