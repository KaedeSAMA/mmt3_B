<template>
  <div class="big">
    <div class="title">部门报名情况概览</div>
    <hr />
    <div class="main">
      <div class="mainInner">
        <v-chart class="chart" :option="option" autoresize />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { beforeDepLineChart } from '@/api/interviewBoard/index';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { ref } from 'vue';
interface ChartsData {
  value: number;
  name: string;
}
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

const myDepId = 1;

let myData = {
  date: ['9.1', '9.2', '9.3', '9.4'],
  orders: [
    {
      name: '总人数',
      data: [7, 16, 23, 30]
    },
    {
      name: '第一志愿',
      data: [2, 5, 7, 9]
    },
    {
      name: '第二志愿',
      data: [5, 9, 13, 16]
    },
    {
      name: '第三志愿',
      data: [0, 2, 3, 5]
    }
  ]
};

let lineData: any = [];

myData.orders.forEach(function (item) {
  lineData.push({
    name: item.name,
    data: item.data,
    type: 'line'
  });
});

const option = ref({
  legend: {
    orient: 'vertical',
    right: 5,
    top: 5
  },
  grid: {
    show: false,
    left: '6%',
    right: '13%'
  },
  tooltip: {
    trigger: 'axis', //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
    axisPointer: {
      //坐标轴指示器
      type: 'cross', //十字准星指示器
      label: {
        backgroundColor: '#ccc'
      }
    }
  },
  xAxis: {
    data: myData.date,
    name: '时间',
    nameGap: 26, //坐标轴名称与轴线间距离
    show: true, //是否显示x轴
    gridIndex: 0, //轴所在grid索引，默认位于第一个grid
    axisLine: {
      show: true, // 是否显示坐标轴轴线
      symbol: ['none', 'arrow'], // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
      symbolOffset: [0, 23],
      lineStyle: {
        color: '#333', // 坐标轴线线的颜色
        width: '3', // 坐标轴线线宽
        type: 'solid', // 坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
        //利用阴影进行延长
        shadowOffsetX: 20, //！！！！！！！！！
        shadowColor: '#333'
      }
    },
    axisTick: {
      show: true, // 是否显示坐标轴刻度
      inside: true // 坐标轴刻度是否朝内，默认朝外
    }
  },
  yAxis: {
    name: '人数',
    nameGap: 26, //坐标轴名称与轴线间距离
    show: true, //是否显示y轴
    gridIndex: 0, //轴所在grid索引，默认位于第一个grid
    axisLine: {
      show: true, // 是否显示坐标轴轴线
      symbol: ['none', 'arrow'], // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
      symbolOffset: [0, 23],
      lineStyle: {
        color: '#333', // 坐标轴线线的颜色
        width: '3', // 坐标轴线线宽
        type: 'solid', // 坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
        //利用阴影进行延长
        shadowOffsetY: -20, //！！！！！！！！！
        shadowColor: '#333'
      }
    },
    axisTick: {
      show: true, // 是否显示坐标轴刻度
      inside: true // 坐标轴刻度是否朝内，默认朝外
    }
  },
  series: lineData
});

//挂载时向后端发起请求获取用户数据
// onMounted(async () => {
//   const data = await beforeDepLineChart(myDepId);
//   if (data) {
//     console.log('beforeDepLineChart');
//     console.log(data);
//   }
// });
</script>
<style scoped lang="scss">
.big {
  height: 100%;
  width: 48%;
  background-color: white;
  border-radius: 10px;
  border: 1px black;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .title {
    height: 5%;
    margin: 4% 0 3% 6%;
  }
  hr {
    width: 100%;
    border: 0;
    height: 1px;
    background-image: linear-gradient(
      to right,
      rgba(180, 180, 180, 0.2),
      rgba(180, 180, 180, 0.4),
      rgba(180, 180, 180, 0.2)
    );
  }
  .main {
    width: 100%;
    height: 91%;
    display: flex;
    justify-content: center;
    align-items: center;
    .mainInner {
      width: 90%;
      height: 85%;
    }
  }
}
</style>
