<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar route>
      <van-tabbar-item replace to="/trend">
        <span>趋势</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :name="props.active ? icon.trend.active : icon.trend.inactive"
        />
      </van-tabbar-item>
      <van-tabbar-item replace to="/message" icon="search">
        <span>消息</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :name="props.active ? icon.msg.active : icon.msg.inactive"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  name: "app",
  components: {},
  data() {
    return {
      icon: {
        trend: {
          active: "fire",
          inactive: "fire-o"
        },
        msg: {
          active: "volume",
          inactive: "volume-o"
        }
      }
    };
  },

  mounted() {
    Notify({
      type: "warning",
      message: "数据接口源于网络，仅供参考！"
    });
  }
};
</script>

<style>
#app {
  width: 100vw;
  overflow-x: hidden;
  margin-bottom: 50px;
}
</style>
