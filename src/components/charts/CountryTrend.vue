<template>
  <div id="diagnose-wrap">
    <Panel :panelData="panelData">
      <canvas id="diagnose" width="380" height="350"></canvas>
    </Panel>
  </div>
</template>

<script>
import Panel from "@/components/common/Panel";
import F2 from "@antv/f2/lib/index";
import { formatDate,groupBy } from "@/assets/js/tools";
import ScrollBar from "@antv/f2/lib/plugin/scroll-bar";
import pan from "@antv/f2/lib/interaction/pan";

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
        // { genre: "1月22日", sold: 571 },
        // { genre: "1月23日", sold: 830 },
        { genre: "1月24日", sold: 1287 },
        { genre: "1月25日", sold: 1975 },
        { genre: "1月26日", sold: 2744 },
        { genre: "1月27日", sold: 4515 },
        { genre: "1月28日", sold: 5974 },
        { genre: "1月29日", sold: 7711 },
        { genre: "1月30日", sold: 9097 }, // 01-31 7：57
        { genre: "1月31日", sold: 9829 } // 02-01 3：15
      ]
    };
  },
  mounted() {
    // this.getAreaData();
    this.createChart();
  },
  methods: {
    // 请求数据
    getAreaData() {
      const provinceLatest = this.$api.charts.provinceLatest;

      provinceLatest().then(res => {
        const data = res.results;

        // 只保留中国
        const cnData = data.filter(item => {
          return item.country === "中国";
        });

        // 时间戳全部转为日期
        for (let i = 0; i < cnData.length; i++) {
          const date = formatDate(cnData[i].updateTime);
          cnData[i].updateTime = date;
        }

      // console.log(groupBy(cnData,'provinceName'));
      });
    },

    // 创建图表
    createChart() {
      const data = this.data;

      const chart = new F2.Chart({
        id: "diagnose",
        plugins: [ScrollBar, pan],
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data, {
        value: {
          tickCount: 5,
          min: 0
        },
        date: {
          type: "timeCat",
          range: [0, 1],
          tickCount: 3
        }
      });

      chart.tooltip({
        custom: true,
        showXTip: true,
        showYTip: true,
        snap: true,
        crosshairsType: "xy",
        crosshairsStyle: {
          lineDash: [2]
        }
      });

      chart.axis("date", {
        label: function label(text, index, total) {
          const textCfg = {};
          if (index === 0) {
            textCfg.textAlign = "left";
          } else if (index === total - 1) {
            textCfg.textAlign = "right";
          }
          return textCfg;
        }
      });

      chart.line().position("genre*sold");

      // 柱状图
      // chart
      //   .source(data)
      //   .interval()
      //   .position("genre*sold")
      //   .color("genre");

      chart.render();
    }
  }
};
</script>


<style scoped>
.van-panel__content {
  padding: 0 !important;
}
</style>
