import Vue from 'vue'
import Mu_Table from './table.vue'
export default {
    data() {
        return {
            memberCode: "",
            token: "",
            resultTitle: "",
            resultContent: ""
        }
    },
    methods: {
        getToken() {
            this.$http.get('token/' + this.memberCode).then(res => {
                this.token = res.body
            })
        },
        getConfig() {
            this.$http.get('config').then(res => {
                this.resultTitle = "config"
                this.resultContent = "<pre>" + JSON.stringify(res.body, null, 4) + "</pre>"

            })
        },
        getWebConfig() {
            this.$http.get('webConfig').then(res => {
                this.resultTitle = "webConfig"
                this.resultContent = "<pre>" + JSON.stringify(res.body, null, 4) + "</pre>"
            })
        },
        getPM2List() {
            this.resultTitle = "PM2List"
            this.resultContent = "<pm2list/>"
            this.$http.get('pm2/list').then(res => {
                let _data = res.body.map(({ pid, name, pm_id, pm2_env: { watch }, monit: { memory, cpu } }) => ({ pid, name, pm_id, memory, cpu, watch }))
                new Vue({
                    el: 'pm2list',
                    render: h => h(Mu_Table, {
                        props: {
                            titles: ["PID", "Name", "PM_ID", "Memory", "CPU", "Watch"],
                            data: _data
                        }
                    })
                })
            })
        }
    }
}