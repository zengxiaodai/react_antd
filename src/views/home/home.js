import React, { Component ,useEffect} from 'react'

/* global BMAP_EARTH_MAP */
const BMapGL = window.BMapGL
let map = null

export default props => {

  useEffect(()=>{
      // GL版命名空间为BMapGL
      var map = new BMapGL.Map("allmap");    // 创建Map实例
      map.centerAndZoom(new BMapGL.Point(118.5, 27.5), 5);  // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      map.setMapType(BMAP_EARTH_MAP);      // 设置地图类型为地球模式
  },[])
  

  return (
    <div className='Zh-canvas'>
        <div
					style={{width:'100%', height:'600px'}}
					id="allmap">
				</div>
    </div>
  )
}

