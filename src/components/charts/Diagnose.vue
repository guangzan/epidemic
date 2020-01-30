<template>
  <div>
    <Panel :panelData="panelData">
      <canvas id="diagnose" width="380" height="260"></canvas>
    </Panel>
  </div>
</template>

<script>
import Panel from "@/components/common/Panel";
import F2 from "@antv/f2";
import { mergeData, formatDate, filterArray } from "@/assets/tools";
import { cloneDeep } from "lodash";

export default {
  components: {
    Panel
  },
  data() {
    return {
      panelData: {
        title: "全国确诊人数趋势",
        desc: "截至当日24时，数据仅供参考",
        status: "全国"
      },
      data: [
        { genre: "1月22日", sold: 571 },
        { genre: "1月23日", sold: 830 },
        { genre: "1月24日", sold: 1287 },
        { genre: "1月25日", sold: 1975 },
        { genre: "1月26日", sold: 2744 },
        { genre: "1月27日", sold: 4515 },
        { genre: "1月28日", sold: 5974 },
        { genre: "1月29日", sold: 7711 }
      ]
    };
  },
  mounted() {
    // this.getAreaData();
    this.createChart()
  },
  methods: {
    // 请求数据
    getAreaData() {
      const province = this.$api.charts.province;

      province("全国").then(res => {
        const data = res.results
        console.log('原始数据',data);

        // 时间戳全部转为日期
        for (let i = 0; i < data.length; i++) {
          const date = formatDate(data[i].updateTime);
          data[i].updateTime = date;
        }
      });
    },

    // 创建图标
    createChart() {
      const chart = new F2.Chart({
        id: "diagnose",
        pixelRatio: window.devicePixelRatio
      });

      chart
        .source(this.data)
        .interval()
        .position("genre*sold")
        .color("genre");

      chart.render();
    }
  }
};
</script>

<style scoped>
</style>
