<template>
  <div>
    <Panel :panelData="panelData">
      <canvas id="correlation" width="380" height="260"></canvas>
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
        title: "一月数据对比",
        desc: "数据仅供参考",
        status: "对比"
      },


      data: [
        {
          date: "22",
          type: "确诊",
          value: 20
        },
        {
          date: "23",
          type: "确诊",
          value: 300
        },
        {
          date: "24",
          type: "确诊",
          value: 200
        },
        {
          date: "22",
          type: "疑似",
          value: 30
        },
        {
          date: "23",
          type: "疑似",
          value: 300
        },
        {
          date: "24",
          type: "疑似",
          value: 500
        },
      ]
    };
  },

  mounted() {
    this.createChart();
  },

  methods: {
    createChart() {
      const chart = new F2.Chart({
        id: "correlation",
        pixelRatio: window.devicePixelRatio
      });

      chart
        .source(this.data)
        .line()
        .position("date*value")
        .color("type");

      chart.render();
    }
  }
};
</script>



<style scoped>
</style>
