<template>
  <div>
    <Panel :panelData="panelData">
      <canvas id="province-trend" width="380" height="350"></canvas>
    </Panel>
  </div>
</template>

<script>
import Panel from "@/components/common/Panel";
import F2 from "@antv/f2/lib/index";
import { formatDate } from "@/assets/js/tools";

export default {
  name: "ProvinceTrend",
  components: {
    Panel
  },
  data() {
    return {
      panelData: {
        title: "全国各省确诊人数",
        desc: "实时数据",
        status: "全国各省"
      },
      data: [],
      huBeiData:{},
    };
  },
  mounted() {
    this.getAreaData();
    // this.createChart();
  },
  methods: {
    // 请求数据
    getAreaData() {
      const province = this.$api.charts.province;

      province().then(res => {
        const data = res.results;
        // console.log("原始数据", data);

        // 时间戳全部转为日期
        for (let i = 0; i < data.length; i++) {
          const date = formatDate(data[i].updateTime);
          data[i].updateTime = date;
        }

        // 只保留中国 抽出湖北
        const finalData = data.filter(item => {
          return item.country === "中国" && item.provinceShortName !== "湖北";
        });

        const huBeiData = data.filter(item => {
          return item.provinceShortName === "湖北";
        });

        this.panelData.desc = `湖北省确诊：${huBeiData[0].confirmedCount}人`;
        this.data = finalData;
        this.createChart();
      });
    },

    // 创建图表
    createChart() {
      const data = this.data;
      data.forEach((obj, index) => {
        obj.index = index;
      });
      // console.log(data);

      const chart = new F2.Chart({
        id: "province-trend",
        pixelRatio: window.devicePixelRatio
      });
      chart.source(data, {
        index: {
          min: 0,
          max: 5
        }
      });
      chart.tooltip({
        onShow(ev) {
          const items = ev.items;
          const title = data[items[0].title].provinceShortName
          items[0].name = title;
          items[0].value = items[0].value + " 人";
        }
      });
      chart
        .interval()
        .position("index*confirmedCount")
        .color("confirmedCount");

      // 因为横坐标为了能够横向滚动，使用了 index ，
      // 现在将他换成省份
      chart.axis("index", {
        label(text) {
          return {
            fontSize: 14,
            text: data[text].provinceShortName
          };
        }
      });

      chart.interaction("pan");
      // 定义进度条
      chart.scrollBar({
        mode: "x",
        xStyle: {
          offsetY: -5
        }
      });

      chart.render();

      // 绘制柱状图文本
      // this.$antvTools.painColText(chart, data);
    }
  }
};
</script>


<style scoped>
.van-panel__content {
  padding: 0 !important;
}
</style>
