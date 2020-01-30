<template>
  <div>
    <van-panel :title="panelData.title" :desc="panelData.desc" :status="panelData.status">
      <div>
        <slot></slot>
      </div>
    </van-panel>
  </div>
</template>

<script>
export default {
  props: {
    panelData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>
</style>
