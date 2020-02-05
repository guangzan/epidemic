<template>
  <div id="trend">
    <van-nav-bar title="趋势" fixed />
    <ProvinceDiagnose />
    <ProvinceDateTrend />
    <!-- <CountryTrend /> -->
    <CountryFour />
    <ProvinceTrend />
  </div>
</template>

 <script>
// import CountryTrend from "@/components/charts/CountryTrend";
import ProvinceDiagnose from "@/components/charts/ProvinceDiagnose";
import ProvinceTrend from "@/components/charts/ProvinceTrend";
import ProvinceDateTrend from "@/components/charts/ProvinceDateTrend";
import CountryFour from "@/components/charts/CountryFour";

export default {
  components: {
    ProvinceDiagnose,
    ProvinceTrend,
    ProvinceDateTrend,
    CountryFour,
    // CountryTrend,
  }
};
</script>


<style scoped>
#trend {
  width: 100vw;
  overflow: hidden;
}
</style>
