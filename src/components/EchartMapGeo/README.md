# 地图组件使用说明

## 参数说明 - props

| 参数               | 必选 | 说明                        | 备注 |
| ------------------ | ---- | --------------------------- | ---- |
| geoJSON            | 是   | Echars 地图底图数据 geoJson |
| config             | 否   | 地图的配置信息              |
| pointData          | 否   | 地图打点数据                |
| barData            | 否   | 地图柱子数据                |
| mapData            | 否   | 地图区域着色数据            |
| maxBarFactor            | 否   | 地图柱子高度系数（默认：0.5）            |
| onMapSelectchanged | 否   | 选中状态变化时回调          |
| onGoBack           | 否   | 上钻时回调                  |
| onDrill            | 否   | 下钻时回调                  |

## 参数说明 - config

| 参数                | 必选 | 说明                              | 备注   |
| ------------------- | ---- | --------------------------------- | ------ |
| option              | 否   | Echars option 可覆盖组件的 option |
| pointSelect         | 否   | 地图选中的打点                    |
| drillLevel          | 否   | 地图上钻/下钻配置                 | 待完善 |
| drillLevel.maxLevel | 是   | 地图区域着色数据                  |
| drillLevel.minLevel | 是   | 选中状态变化时回调                |

## 使用示例

```javascript
import { EchartMapGeo } from "@monorepo/base-components";


function App() {
   return <EchartMapGeo geoJSON={geoJSON} mapData={mapData} {...}/>
}
```