<template>
  <div>
    <van-nav-bar title="动态" fixed right-text="选择省份" @click-right="areaToggle">
      <!-- <van-icon name="location" slot="right">选择省份</van-icon> -->
    </van-nav-bar>
    <van-panel :title="panelData.title" :desc="panelData.desc" :status="panelData.status">
      <div>
        <!-- <van-cell title="📍 选择省份" @click="areaToggle" /> -->
        <!-- 新闻列表 -->
        <van-list
          immediate-check
          :finished="finished"
          v-model="loading"
          finished-text="没有更多了"
          @load="getData"
        >
          <Panel
            v-for="(item,index) in data"
            :key="index"
            :panelData="{title: item.title,desc:item.pubDate,status:item.infoSource,icon:'fire-o'}"
          >
            <div class="new-content">{{item.summary}}</div>
          </Panel>
        </van-list>
      </div>
    </van-panel>

    <van-area
      v-show="showPicker"
      @cancel="areaCancel"
      @confirm="areaConfirm"
      :area-list="areaList"
      :columns-num="1"
      :visible-item-count="visibleItemCount"
    />
  </div>
</template>

<script>
import areaList from "@/assets/area";
import { Notify } from "vant";
import Panel from "@/components/common/Panel";
import { formatDate } from "@/assets/tools";

export default {
  components: { Panel },
  data() {
    return {
      list: [],
      offset: 0,
      visibleItemCount: 6,
      panelData: {
        title: "🔥 新闻动态",
        desc: "实时数据",
        status: "山东省"
      },
      data: [],
      areaList,
      province: "山东省",
      num: 0,
      showPicker: false,
      loading: false,
      finished: false
    };
  },

  mounted() {},

  methods: {
    areaToggle() {
      this.showPicker = !this.showPicker;
    },

    // 确认选择省份
    areaConfirm(v) {
      this.areaToggle();
      const province = v[0].name;
      this.province = province;
      this.num = 0;
      this.data = [];
      this.getData();
      this.panelData.status = province;
    },

    //取消选择省份
    areaCancel() {
      this.areaToggle();
    },

    load() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.data.push({ title: "111111" });
        }

        this.loading = false;

        if (this.data.length >= 60) {
          this.finished = true;
        }
      }, 3000);
    },

    // 请求数据
    getData() {
      const news = this.$api.message.news;
      const province = this.province;
      const num = (this.num += 5);
      console.log(num);

      news(province, num).then(res => {
        this.loading = false;
        const data = res.results;

        if (data.length === this.data.length) {
          Notify({ type: "warning", message: "没有更多内容了" });
          this.finished = true;
          return;
        }

        // 时间戳全部转为日期
        for (let i = 0; i < data.length; i++) {
          const date = formatDate(data[i].pubDate);
          data[i].pubDate = date;
        }
        this.data = data;
        console.log(this.data);
      });
    }
  }
};
</script>

<style scoped>
.new-content {
  padding: 10px 16px;
}
</style>
