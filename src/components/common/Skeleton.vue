<template>
  <div>
    <van-skeleton title :row="5" :loading="loading">
      <div>
          <slot></slot>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            required: true
        }
    }
};
</script>

<style scoped>
</style>
