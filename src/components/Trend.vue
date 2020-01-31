<template>
  <div id="trend">
    <van-nav-bar title="趋势" fixed />
    <ProvinceConfirmed />
    <Diagnose />
    <!-- <Cure />
    <Correlation />-->
  </div>
</template>

 <script>
import Diagnose from "@/components/charts/Diagnose";
// import Cure from "@/components/charts/Cure";
// import Correlation from "@/components/charts/Correlation";
import ProvinceConfirmed from "@/components/charts/ProvinceConfirmed";

export default {
  components: {
    Diagnose,
    // Cure,
    // Correlation,
    ProvinceConfirmed
  }
};
</script>


<style scoped>
#trend {
  width: 100vw;
  overflow: hidden;
}
</style>
