<template>
  <div id="trend">
    <van-nav-bar title="趋势" fixed />
    <ProvinceDiagnose />
    <Diagnose />
    <CountryFour />
    <ProvinceTrend />
    <!-- <Cure />
    <Correlation />-->
  </div>
</template>

 <script>
import Diagnose from "@/components/charts/Diagnose";
import ProvinceDiagnose from "@/components/charts/ProvinceDiagnose";
import ProvinceTrend from "@/components/charts/ProvinceTrend";
import CountryFour from "@/components/charts/CountryFour";
// import Cure from "@/components/charts/Cure";
// import Correlation from "@/components/charts/Correlation";

export default {
  components: {
    Diagnose,
    // Cure,
    // Correlation,
    ProvinceDiagnose,
    ProvinceTrend,
    CountryFour,
  }
};
</script>


<style scoped>
#trend {
  width: 100vw;
  overflow: hidden;
}
</style>
