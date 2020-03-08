<template>
    <div>
        <van-nav-bar title="消息" fixed />
        <Panel :panelData="panelData">
            <Skeleton :loading="loading">
                <van-cell-group>
                    <van-collapse accordion v-model="activeNames">
                        <van-collapse-item icon="volume-o" title="说明" name="generalRemark">{{
                            message.generalRemark
                        }}</van-collapse-item>
                        <van-collapse-item icon="warn-o" title="病毒名称" name="virus">{{
                            message.virus
                        }}</van-collapse-item>
                        <van-collapse-item icon="warn-o" title="传染源" name="infectSource">{{
                            message.infectSource
                        }}</van-collapse-item>
                        <van-collapse-item icon="warn-o" title="传播途径" name="passWay">{{
                            message.passWay
                        }}</van-collapse-item>
                        <van-collapse-item icon="friends-o" title="易感人群" name="remark1">{{
                            message.remark1
                        }}</van-collapse-item>
                        <van-collapse-item icon="todo-list-o" title="潜伏期" name="remark2">{{
                            message.remark2
                        }}</van-collapse-item>
                    </van-collapse>

                    <van-cell title="确诊人数" icon="warning-o" :value="message.confirmedCount" />
                    <van-cell title="疑似人数" icon="question-o" :value="message.suspectedCount" />
                    <van-cell title="治愈人数" icon="smile-o" :value="message.curedCount" />
                    <van-cell title="死亡人数" icon="close" :value="message.deadCount" />
                    <van-cell title="更新时间" icon="clock-o" :value="message.updateTime" />
                </van-cell-group>
            </Skeleton>
        </Panel>
    </div>
</template>

<script>
import Panel from '@/components/common/Panel'
import Skeleton from '@/components/common/Skeleton'
import { formatDate } from '@/assets/js/tools'

export default {
    components: {
        Panel,
        Skeleton,
    },

    data() {
        return {
            activeNames: 'generalRemark',
            panelData: {
                title: '消息',
                desc: '病毒研究情况以及全国疫情概览',
                status: '',
            },
            message: {
                infectSource: '',
                passWay: '',
                confirmedCount: '',
                suspectedCount: '',
                curedCount: '',
                deadCount: '',
                virus: '',
                remark1: '',
                remark2: '',
                generalRemark: '',
                updateTime: '',
            },
            loading: true,
        }
    },

    mounted() {
        this.getMessage()
    },

    methods: {
        // 获取数据
        getMessage() {
            const overall = this.$api.message.overall

            overall().then(res => {
                // console.log(res)
                ;({
                    note2: this.message.infectSource,
                    note3: this.message.passWay,
                    confirmedCount: this.message.confirmedCount,
                    suspectedCount: this.message.suspectedCount,
                    curedCount: this.message.curedCount,
                    deadCount: this.message.deadCount,
                    note1: this.message.virus,
                    remark1: this.message.remark1,
                    remark2: this.message.remark2,
                    generalRemark: this.message.generalRemark,
                    updateTime: this.message.updateTime,
                } = res.results[0])

                const updateTime = this.message.updateTime
                this.message.updateTime = formatDate(updateTime, 'Y年m月d日 H时')

                this.loading = false
            })
        },
    },
}
</script>

<style scoped></style>
