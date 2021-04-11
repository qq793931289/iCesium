import * as React from 'react';
// import * as iCesium from 'icesium';
import 'antd/dist/antd.css';
import './style';

import { Input } from 'antd';
// import { CesiumContainer } from '../../cesium/ui.comp';
import { Earth } from '../..';
// import { BaseContainer } from '../ui/base';
// import { App } from '../../config';
import { AddressLocation } from '../../utils/addresslocation';
// import { cesConfig } from './config';
const { Search } = Input;

export interface CesiumContainerProps {
  ref: any;
}

export class AddressLocationComponent extends React.Component {

  private _earth?: Earth;
  // private _container?: HTMLDivElement | null;
  public myInput = React.createRef();
  public ref: any;

  private _addressLocation?: AddressLocation;

  // constructor(props: CesiumContainerProps) {
  //   super(props);
  //   this.ref = props.ref;

  // }

  constructor(props:any){
    super(props);
    this.componentDidMount();
  }


  public getContainer() {
    return this.myInput;
  }

  public componentDidMount() {
    console.log('load earth start');
    this._earth = new Earth();
    console.log('load earth end');

    this._addressLocation = new AddressLocation({
      viewer: this._earth.viewer,
    });

    // this._earth.earthMap.nightMapShow(true);

    // this.myInput = React.createRef();
    // (App as any).myInput = this.refs.myInput;
  }

  public search(input: string) {
    // this.iCesium?.search(input);
    this._addressLocation?.search(input);
  }

  private _search(input: string) {
    // this.iCesium?.search(input);
    this._addressLocation?.search(input);
  }

  public handleClick() {
    // 使用原生的 DOM API 获取焦点
    // this.refs.myInput.focus();
    // console.log(this.refs, this.refs.myInput, ' // 使用原生的 DOM API 获取焦点');
  }

  public render() {
    // const style = { height: '100vh' };
    const style2: React.CSSProperties = { position: 'absolute', top: 0, left: 0, zIndex: 1 };
    return (
      <div
        // id='cesiumContainer'
        // ref={(ref) => CesiumContainer._container = ref}
        ref='myInput'
        // style={style}
        onClick={this.handleClick.bind(this)}
        style={style2}
      >
        {/* <Search
          placeholder='百度地图API搜索'
          onSearch={value => {
            // this._search(value);
            this.iCesium!.search(value);
          }}
          style={{ width: 512, position: 'absolute', top: 50, left: 300, zIndex: 1 }}
          enterButton
        /> */}
        {/* {this.ref} */}
        {/* <BaseContainer /> */}
        <div >
          <Search
            placeholder='百度地图API搜索'
            // ref='search'
            onSearch={value => {
              this._search(value);
              // this.iCesium!.search(value);
            }}
            style={{ width: 512, position: 'relative', top: 100, left: 100, zIndex: 1 }}
            enterButton
          />
        </div>
      </div>
    );
  }

}