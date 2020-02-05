export default {
    // 绘制柱状图文本
    // data 渲染该图的所有数据数据
    // chart 图表实例
    painColText(chart, data) {
        const offset = -3;
        const canvas = chart.get("canvas");
        const group = canvas.addGroup();
        // const shapes = {};
        data.forEach(function (obj) {
            const point = chart.getPosition(obj);
            // const text =
            group.addShape("text", {
                attrs: {
                    x: point.x,
                    y: point.y + offset,
                    text: obj.confirmedCount,
                    textAlign: "center",
                    textBaseline: "bottom",
                    fill: "#808080"
                }
            });
            // shapes[obj.year] = text; // 缓存该 shape, 便于后续查找
        });

    }
}
