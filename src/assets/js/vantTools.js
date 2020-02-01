import { Notify } from "vant";

export default {
    notify(msg, color, duration=1000) {
        Notify({
            type: color,
            duration,
            message: msg
        });
    },

    clearNotify() {
        Notify.clear();
    }
}
