<template>
  <div>
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
