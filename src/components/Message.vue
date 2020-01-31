<template>
  <div>
    <van-nav-bar title="消息" fixed />
    <Panel :panelData="panelData">
      <Skeleton :loading="loading">
        <van-cell-group>
          <van-cell title="说明" :value="message.generalRemark" />
          <van-cell title="病毒名称" :value="message.virus" />
          <van-cell title="传染源" :value="message.infectSource" />
          <van-cell title="传播途径" :value="message.passWay" />
          <van-cell title="确诊人数" :value="message.confirmedCount" />
          <van-cell title="疑似感染人数" :value="message.suspectedCount" />
          <van-cell title="治愈人数" :value="message.curedCount" />
          <van-cell title="死亡人数" :value="message.deadCount" />
          <van-cell title="易感人群" :value="message.remark1" />
          <van-cell title="潜伏期" :value="message.remark2" />
          <van-cell title="更新时间" :value="message.updateTime" />
        </van-cell-group>
      </Skeleton>
    </Panel>
  </div>
</template>

<script>
import Panel from "@/components/common/Panel";
import Skeleton from "@/components/common/Skeleton";
import { formatDate } from "@/assets/tools";

export default {
  components: {
    Panel,
    Skeleton
  },

  data() {
    return {
      panelData: {
        title: "📜 消息",
        desc: "病毒研究情况以及全国疫情概览",
        status: ""
      },
      message: {
        infectSource: "",
        passWay: "",
        confirmedCount: "",
        suspectedCount: "",
        curedCount: "",
        deadCount: "",
        virus: "",
        remark1: "",
        remark2: "",
        generalRemark: "",
        updateTime: ""
      },
      loading: true
    };
  },

  mounted() {
    this.getMessage();
  },

  methods: {
    // 获取数据
    getMessage() {
      const overall = this.$api.message.overall;

      overall().then(res => {
        ({
          infectSource: this.message.infectSource,
          passWay: this.message.passWay,
          confirmedCount: this.message.confirmedCount,
          suspectedCount: this.message.suspectedCount,
          curedCount: this.message.curedCount,
          deadCount: this.message.deadCount,
          virus: this.message.virus,
          remark1: this.message.remark1,
          remark2: this.message.remark2,
          generalRemark: this.message.generalRemark,
          updateTime: this.message.updateTime
        } = res.results[0]);

        const updateTime = this.message.updateTime;
        this.message.updateTime = formatDate(updateTime, 'Y年m月d日');

        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
</style>
