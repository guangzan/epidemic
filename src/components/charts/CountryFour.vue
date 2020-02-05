<template>
  <div>
    <Panel :panelData="panelData">
      <canvas id="country-four"></canvas>
    </Panel>
  </div>
</template>

<script>
import Panel from "@/components/common/Panel";
import F2 from "@antv/f2/lib/index-all";
import { formatDate } from "@/assets/js/tools";

export default {
  name: "CountryFour",
  components: {
    Panel
  },
  data() {
    return {
      panelData: {
        title: "全国四项数据对比",
        desc: "",
        status: "全国"
      },
      data: [],
      count: "",
      title: ""
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    // 请求数据
    // 获取数据
    getData() {
      const overall = this.$api.message.overall;
      let confirmedCount = "";
      let suspectedCount = "";
      let curedCount = "";
      let deadCount = "";
      let updateTime = "";
      overall().then(res => {
        ({
          confirmedCount,
          suspectedCount,
          curedCount,
          deadCount,
          updateTime: this.data.updateTime
        } = res.results[0]);

        updateTime = formatDate(updateTime, "Y年m月d日");
        this.panelData.desc = updateTime;

        this.data = [
          {
            const: "const",
            type: "确诊人数",
            value: confirmedCount,
            a: 1
          },
          {
            const: "const",
            type: "治愈人数",
            value: curedCount,
            a: 1
          },
          {
            const: "const",
            type: "疑似人数",
            value: suspectedCount,
            a: 1
          },
          {
            const: "const",
            type: "死亡人数",
            value: deadCount,
            a: 1
          }
        ];

        // console.log(this.data);
        this.createChart();
      });
    },

    // 创建图表
    createChart() {
      const data = this.data;
      // console.log(data);

      // 饼图
      // const chart = new F2.Chart({
      //   id: "country-four",
      //   pixelRatio: window.devicePixelRatio
      // });

      // chart.source(data);
      // chart.coord("polar", {
      //   transposed: true,
      //   radius: 0.9,
      //   innerRadius: 0.5
      // });
      // chart.axis(false);
      // chart.legend(false);
      // chart.tooltip(false);
      // chart.guide().html({
      //   position: ["50%", "50%"],
      //   html: `
      //     <div style="text-align: center;width:150px;height: 50px;">\n
      //       <p style="font-size: 12px;color: #999;margin: 0" ref='title' id="title" ></p>\n
      //       <p style="font-size: 18px;color: #343434;margin: 0;font-weight: bold;"  ref='value' id="value"></p>\n
      //     </div>
      //   `
      // });

      // chart
      //   .interval()
      //   .position("const*value")
      //   .adjust("stack")
      //   .color("type", ["#1890FF", "#13C2C2", "#2FC25B", "#FACC14"]);

      // let self = this;
      // chart.pieLabel({
      //   sidePadding: 10,
      //   activeShape: true,
      //   label1(data) {
      //     return {
      //       text: data.value,
      //       fill: "#343434",
      //       fontWeight: "bold"
      //     };
      //   },
      //   label2(data) {
      //     return {
      //       text: data.type,
      //       fill: "#999"
      //     };
      //   },
      //   onClick(ev) {
      //     const data = ev.data;
      //     if (data) {
      //       const type = data.type;
      //       const value = data.value;
      //       // 如何更新视图 ？
      //     }
      //   }
      // });
      // chart.render();

      // 南丁格尔玫瑰图 bug： 只显示两个
      // const chart = new F2.Chart({
      //   id: "country-four",
      //   pixelRatio: window.devicePixelRatio
      // });
      // chart.source(data);
      // chart.coord("polar");
      // chart.legend({
      //   position: "right"
      // });
      // chart.axis(false);
      // chart
      //   .interval()
      //   .position("type*value")
      //   .color("type")
      //   .style({
      //     lineWidth: 1,
      //     stroke: "#fff"
      //   });
      // chart.render();

      // 饼图半圆
      const chart = new F2.Chart({
        id: "country-four",
        pixelRatio: window.devicePixelRatio
      });
      chart.source(data);
      chart.legend({
        position: "top",
        align: "center"
      });
      chart.coord("polar", {
        transposed: true,
        startAngle: -Math.PI,
        endAngle: 0
      });
      chart.axis(false);
      chart
        .interval()
        .position("a*value")
        .color("type", [
          "#1890FF",
          "#13C2C2",
          "#2FC25B",
          "#FACC14",
          "#F04864",
          "#8543E0"
        ])
        .adjust("stack");

      chart.pieLabel({
        sidePadding: 10,
        activeShape: true,
        label1(data) {
          return {
            text: data.value,
            fill: "#343434",
            fontWeight: "bold"
          };
        },
        label2(data) {
          return {
            text: data.type,
            fill: "#999"
          };
        }
      });

      chart.render();
    }
  }
};
</script>

<style scoped>
#country-four {
  display: block;
  margin: 0 auto;
}
</style>
