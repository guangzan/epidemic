<template>
  <div>
    <van-panel :title="panelData.title" :desc="panelData.desc" :status="panelData.status">
      <div>
        <van-cell title="📍 选择省份" @click="areaToggle" />
        <canvas id="cure" width="380" height="350"></canvas>
      </div>
    </van-panel>

    <van-area
      v-show="showPicker"
      :area-list="areaList"
      @cancel="areaCancel"
      @confirm="areaConfirm"
      :columns-num="1"
      :visible-item-count="visibleItemCount"
    />
  </div>
</template>

<script>
import F2 from "@antv/f2";
import areaList from "@/assets/area";
import { Notify } from "vant";

export default {
  data() {
    return {
      visibleItemCount: 6,
      panelData: {
        title: "各省份感染人数",
        desc: "实时数据",
        status: "山东省"
      },
      data: [],
      areaList,
      province: "山东省",
      showPicker: false
    };
  },

  mounted() {
    this.getAreaData();
  },

  methods: {
    areaToggle() {
      this.showPicker = !this.showPicker;
    },

    // 确认选择省份
    areaConfirm(v) {
      this.areaToggle();
      const province = v[0].name;
      this.province = province;
      this.getAreaData();
      this.panelData.status = province;
    },

    //取消选择省份
    areaCancel() {
      this.areaToggle();
    },

    // 请求省份数据
    getAreaData() {
      const area = this.$api.charts.area;

      area(this.province).then(res => {
        if (res.results[0] === undefined) {
          Notify("暂无数据");
          return;
        }
        const data = res.results[0].cities;
        console.log(res);

        this.data = data;
        this.createChart();
      });
    },

    // 创建图表
    createChart() {
      const chart = new F2.Chart({
        id: "cure",
        padding: 'auto',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      });

      chart
        .source(this.data)
        .interval()
        .position("cityName*confirmedCount")
        .color("cityName");

      chart.render();
    }
  }
};
</script>

<style scoped>
</style>
