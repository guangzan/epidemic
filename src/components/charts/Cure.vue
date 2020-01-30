<template>
  <div>
    <Panel :panelData="panelData">
      <canvas id="cure" width="380" height="260"></canvas>
    </Panel>
  </div>
</template>

<script>
import Panel from "@/components/common/Panel";
import F2 from "@antv/f2";
export default {
  components: {
    Panel
  },
  data() {
    return {
      panelData: {
        title: "全国治愈人数",
        desc: "截至当日24时，数据仅供参考",
        status: "治愈"
      },
      data: [
        { genre: "1月22日", sold: 571 },
        { genre: "1月23日", sold: 1975 },
        { genre: "1月24日", sold: 1975 },
        { genre: "1月25日", sold: 1975 },
        { genre: "1月26日", sold: 2744 },
        { genre: "1月27日", sold: 4515 },
        { genre: "1月28日", sold: 5974 }
      ]
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const chart = new F2.Chart({
        id: "cure",
        pixelRatio: window.devicePixelRatio // 指定分辨率
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
