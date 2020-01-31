import { Notify } from "vant";

export default {
    notify(msg, color) {
        Notify({
            type: color,
            duration: 1000,
            message: msg
        });
    },

    clearNotify() {
        Notify.clear();
    }
}
