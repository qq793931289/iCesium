


// package wewell.com.qcl.util;

const debug = false;

const x_pi = 3.14159265358979324 * 3000.0 / 180.0;
//pai
const pi = 3.1415926535897932384626;
//离心率
const ee = 0.00669342162296594323;
//长半轴
const a = 6378245.0;
//百度转国测局
function bd09togcj02(bd_lon: number, bd_lat: number) {
  const x = bd_lon - 0.0065;
  const y = bd_lat - 0.006;
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  const gg_lng = z * Math.cos(theta);
  const gg_lat = z * Math.sin(theta);
  debug && console.log([gg_lng, gg_lat], 'bd09togcj02');
  return [gg_lng, gg_lat];
}
//国测局转百度
// function gcj02tobd09(lng: number, lat: number) {
//   const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_pi);
//   const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_pi);
//   const bd_lng = z * Math.cos(theta) + 0.0065;
//   const bd_lat = z * Math.sin(theta) + 0.006;
//   debug &&console.log([bd_lng, bd_lat], 'gcj02tobd09');
//   return [bd_lng, bd_lat];
// }
//国测局转84
function gcj02towgs84(lng: number, lat: number) {
  let dlat = transformlat(lng - 105.0, lat - 35.0);
  let dlng = transformlng(lng - 105.0, lat - 35.0);
  const radlat = lat / 180.0 * pi;
  let magic = Math.sin(radlat);
  magic = 1 - ee * magic * magic;
  const sqrtmagic = Math.sqrt(magic);
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * pi);
  dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * pi);
  const mglat = lat + dlat;
  const mglng = lng + dlng;

  const x = lng * 2 - mglng;
  const y = lat * 2 - mglat;
  debug &&console.log([x, y], 'gcj02towgs84');
  return [x, y];
};

//经度转换
function transformlat(lng: number, lat: number) {
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * pi) + 20.0 * Math.sin(2.0 * lng * pi)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * pi) + 40.0 * Math.sin(lat / 3.0 * pi)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * pi) + 320 * Math.sin(lat * pi / 30.0)) * 2.0 / 3.0;
  debug &&console.log(ret, 'transformlat');
  return ret;
}
//纬度转换
function transformlng(lng: number, lat: number) {
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * pi) + 20.0 * Math.sin(2.0 * lng * pi)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * pi) + 40.0 * Math.sin(lng / 3.0 * pi)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * pi) + 300.0 * Math.sin(lng / 30.0 * pi)) * 2.0 / 3.0;
  debug &&console.log(ret, 'transformlng');
  return ret;
}

//1 使用说明 （bd09->wgs84 ）
function getWgs84xy(x: number, y: number) {
  //先转 国测局坐标

  const doubles_gcj = bd09togcj02(x, y);//（x 117. y 36. ）
  debug &&console.log(doubles_gcj, 'doubles_gcj');

  //国测局坐标转wgs84

  const doubles_wgs84 = gcj02towgs84(doubles_gcj[0], doubles_gcj[1]);
  debug &&console.log(doubles_wgs84, 'doubles_wgs84');

  debug &&console.log(doubles_wgs84, 'getWgs84xy');
  debug &&console.log(doubles_wgs84, '坐标');
  //返回 纠偏后 坐标
  // return doubles_wgs84[0] + "," + doubles_wgs84[1];
  return doubles_wgs84;
}

const res = getWgs84xy(113, 23);

debug &&console.log(res, 'wgs84 数据');


const res1 = gcj02towgs84(129.1312655 - 10, 34.4487351 - 10);

debug &&console.log(res1, 'wgs84 数据');



export class CoordinateTools {

  public static getWgs84xy(lng: number, lat: number) {
    return getWgs84xy(lng, lat);
  }


}