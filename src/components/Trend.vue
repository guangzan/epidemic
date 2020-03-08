<template>
    <div id="trend">
        <van-nav-bar title="趋势" fixed />
        <ProvinceDiagnose />
        <!-- <ProvinceDateTrend /> -->
        <!-- <CountryFour /> -->
        <!-- <ProvinceTrend /> -->
        <!-- <CountryTrend /> -->
    </div>
</template>

<script>
import ProvinceDiagnose from '@/components/charts/ProvinceDiagnose'
import ProvinceDateTrend from '@/components/charts/ProvinceDateTrend'
import ProvinceTrend from '@/components/charts/ProvinceTrend'
import CountryFour from '@/components/charts/CountryFour'
// import CountryTrend from "@/components/charts/CountryTrend";

export default {
    components: {
        ProvinceDiagnose,
        ProvinceTrend,
        ProvinceDateTrend,
        CountryFour,
        // CountryTrend,
    },
}
</script>

<style scoped>
#trend {
    width: 100vw;
    overflow: hidden;
}
</style>
