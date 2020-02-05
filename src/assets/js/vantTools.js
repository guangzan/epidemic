import { Notify } from "vant";

export default {
    // vant 提示
    notify(msg, color, duration=1000) {
        Notify({
            type: color,
            duration,
            message: msg
        });
    },
}
