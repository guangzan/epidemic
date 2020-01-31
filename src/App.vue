<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar route @change="changeSideBar">
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
        <span>信息</span>
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
// import { Notify } from "vant";
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
        news: {
          active: "location",
          inactive: "location-o"
        },
        msg: {
          active: "label",
          inactive: "label-o"
        }
      }
    };
  },

  mounted() {
    const notify = this.$vantTools.notify;
    notify("数据接口源于网络，仅供参考！","success");
    this.$router.push("/trend");
  },

  methods: {
    // 切换 sidebar
    changeSideBar(active) {
      const notify = this.$vantTools.notify;
      this.$vantTools.clearNotify();
      const actions = {
        1: () => {
          notify("点击右上角切换省份", "primary");
        },
        2: () => {
          // notify("信息", "primary");
        },
        5: () => {
          notify("错误", "danger");
        }
      };
      actions[active]();
    }
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
  /* background-color: #F9F0FF; */
}

.van-nav-bar__title {
  /* color: #fff; */
}
</style>
