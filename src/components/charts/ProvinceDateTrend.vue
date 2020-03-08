<template>
    <div>
        <van-panel
            :title="panelData.title"
            :desc="panelData.desc"
            :status="'当前：' + panelData.status"
        >
            <div>
                <van-cell title="📍 选择省份" @click="areaToggle" />
                <canvas id="province-date-trend" width="380" height="350"></canvas>
            </div>
        </van-panel>

        <van-area
            v-show="showPicker"
            :area-list="areaList"
            @cancel="areaCancel"
            @confirm="areaConfirm"
            :columns-num="1"
            :visible-item-count="visibleItemCount"
        />
    </div>
</template>

<script>
import F2 from '@antv/f2/lib/index'
import areaList from '@/assets/js/area'
import { Notify } from 'vant'
import { groupBy, formatDate } from '@/assets/js/tools'

export default {
    data() {
        return {
            visibleItemCount: 6,
            panelData: {
                title: '该省份确诊人数趋势',
                desc: '实时数据',
                status: '山东省',
            },
            data: [],
            areaList,
            province: '山东省',
            showPicker: false,
        }
    },

    mounted() {
        this.getAreaData()
    },

    methods: {
        areaToggle() {
            this.showPicker = !this.showPicker
        },

        // 确认选择省份
        areaConfirm(v) {
            this.areaToggle()
            const province = v[0].name
            this.province = province
            this.getAreaData()
            this.panelData.status = province
        },

        //取消选择省份
        areaCancel() {
            this.areaToggle()
        },

        // 请求省份数据
        getAreaData() {
            const provinceDate = this.$api.charts.provinceDate
            // console.log('get data', this.province)
            provinceDate(this.province).then(res => {
                const { results } = res
                // console.log('res', res)
                if (results[0] === undefined) {
                    Notify('暂无数据')
                    return
                }

                for (let i = 0; i < results.length; i++) {
                    const date = formatDate(results[i].updateTime, 'm-d H时')
                    results[i].updateTime = date
                }

                this.data = results.reverse().slice(-20)
                this.createChart()
            })
        },

        // 创建图表
        createChart() {
            const data = this.data
            data.forEach((obj, index) => {
                obj.index = index
            })

            const chart = new F2.Chart({
                id: 'province-date-trend',
                pixelRatio: window.devicePixelRatio,
            })

            chart.source(data, {
                index: {
                    min: 0,
                    max: 5,
                },
            })

            chart.axis('index', {
                label(text) {
                    return {
                        fontSize: 12,
                        text: data[text].updateTime,
                    }
                },
            })

            chart.tooltip({
                onShow(ev) {
                    const items = ev.items
                    const title = data[items[0].title].updateTime
                    items[0].name = title
                    items[0].value = items[0].value + ' 人'
                },
            })

            chart.line().position('index*confirmedCount')

            chart.interaction('pan')
            // 定义进度条
            chart.scrollBar({
                mode: 'x',
                xStyle: {
                    offsetY: -5,
                },
            })

            chart.render()
        },
    },
}
</script>

<style scoped></style>
