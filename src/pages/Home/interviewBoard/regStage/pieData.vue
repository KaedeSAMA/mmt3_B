<template>
  <div class="big">
    <div class="title">各部门报名情况</div>
    <hr />
    <div class="main">
      <div class="mainInner">
        <div class="leftText">
          <div style="margin-bottom: 8%" v-for="item in myData.depNums">
            <div
              style="font-weight: 600; margin-bottom: 2%; font-size: smaller"
            >
              {{ item.departmentName }}：{{ item.num }}人
            </div>
            <div style="font-size: small; color: gray">
              第一志愿报名人数：{{ item.firstChoiceNum }}人
            </div>
          </div>
        </div>
        <v-chart
          class="chart"
          :option="option"
          autoresize
          :update-options="{ notMerge: true }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { beforeOrgPieChart } from '@/api/interviewBoard/index';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { ref } from 'vue';
import { formatter } from 'element-plus';
interface ChartsData {
  value: number;
  name: string;
}
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

let myData: any = ref({
  depNum: 1,
  cNum: 0,
  depNums: [
    {
      num: 0,
      firstChoiceNum: 0,
      departmentName: '部门一'
    },
    {
      num: 0,
      firstChoiceNum: 0,
      departmentName: '部门二'
    },
    {
      num: 0,
      firstChoiceNum: 0,
      departmentName: '部门三'
    }
  ]
});

let option = ref({
  legend: {
    orient: 'horizontal', //图例的布局，水平布局、垂直布局
    top: '75%',
    // icon: 'circle',
    itemWidth: 20, //图例宽度
    itemHeight: 10, //图例高度
    //图例字体样式
    color: '#000',
    fontFamily: '微软雅黑'
  },

  series: [
    {
      type: 'pie',
      data: null,
      radius: '60%',
      center: ['50%', '40%'],
      label: {
        //饼图图形上的文本标签
        show: true,
        position: 'inner', //标签的位置
        fontWeight: 300,
        fontSize: 12, //文字的字体大小
        formatter: '{c}人'
      },
      itemStyle: {
        color: function (colors: any) {
          var colorList = [
            '#c1ebdd',
            '#fb9495',
            '#fddd9b',
            '#e6c2cc',
            '#b2def7',
            '#bf95dd'
          ];
          return colorList[colors.dataIndex];
        }
      }
    }
  ]
});
//挂载时向后端发起请求获取用户数据
onMounted(async function () {
  const data = await beforeOrgPieChart();
  if (data) {
    console.log('beforeOrgPieChart');
    console.log(data);
    myData.value = data;
  }

  var chartsData: any = [];
  myData.value.depNums.forEach(function (item: any) {
    chartsData.push({
      value: item.num,
      name: item.departmentName
    });
  });

  option.value.series[0].data = chartsData;
});
</script>
<style scoped lang="scss">
.big {
  height: 66%;
  width: 100%;
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
    height: 87%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .mainInner {
      width: 85%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .leftText {
        height: 100%;
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
}
</style>
