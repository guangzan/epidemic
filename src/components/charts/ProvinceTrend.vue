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
import ScrollBar from "@antv/f2/lib/plugin/scroll-bar";
// import pan from "@antv/f2/lib/interaction/pan";
// import Gesture from "@antv/f2/lib/plugin/gesture";

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
      data: []
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

        this.data = finalData;
        this.createChart();
      });
    },

    // 创建图标
    createChart() {
      const data = this.data;

      // 通过横坐标定义初始显示的数据，剩余的数据通过滑动显示
      const originProvinces = [
        "浙江",
        "广东",
        "台湾",
        "江苏",
        "内蒙古",
        "云南"
      ];

    //   const originProvinces = []
    //   data.forEach(function(obj, index) {
    //     if (index > 6) {
    //       originProvinces.push(obj.provinceShortName);
    //       console.log(originProvinces);
    //     }
    //   });

      const chart = new F2.Chart({
        id: "province-trend",
        plugins: [ScrollBar],
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data, {
        provinceShortName: {
          tickCount: 5,
          values: originProvinces,
          type: "cat"
        },
        confirmedCount: {
          tickCount: 5
        }
      });

      chart
        .interval()
        .position("provinceShortName*confirmedCount")
        .color("provinceShortName");

      chart.tooltip({
        showItemMarker: true,
        background: {
          radius: 2,
          padding: [3, 5]
        },
        onShow(ev) {
          const items = ev.items;
          items[0].name = items[0].title;
          items[0].value = items[0].value + " 人";
        }
      });

      // 是否显示图例
      chart.legend(false);

      chart.interaction("pan");

      // 定义进度条
      chart.scrollBar({
        mode: "x",
        xStyle: {
          backgroundColor: "#e8e8e8",
          fillerColor: "#808080",
          offsetY: -2
        }
      });

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
