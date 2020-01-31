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
      <van-tabbar-item replace to="/news">
        <span>动态</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :name="props.active ? icon.news.active : icon.news.inactive"
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
        },
        news: {
          active: "location",
          inactive: "location-o"
        }
      }
    };
  },

  mounted() {
    Notify({
      type: "success",
      message: "数据接口源于网络，仅供参考！"
    });

    this.$router.push("/trend");
  }
};
</script>

<style>
#app {
  width: 100vw;
  margin: 46px 0 50px;
}

.van-picker {
  position: fixed;
  bottom: 50px;
  width: 100vw;
  z-index: 10;
}

.van-nav-bar {
  /* background-color: #13C2C2; */
}

.van-nav-bar__title {
  /* color: #fff; */
}
</style>
