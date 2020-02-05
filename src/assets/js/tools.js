/**
 *
 * @param {*} timestamp
 * @param {*} formats Y-m-d | Y-m-d H:i:s | Y年m月d日 | Y年m月d日 H时i分
 */
const formatDate = (timestamp, formats) => {

    formats = formats || 'Y-m-d';

    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    var myDate = timestamp ? new Date(timestamp) : new Date();

    var year = myDate.getFullYear();
    var month = zero(myDate.getMonth() + 1);
    var day = zero(myDate.getDate());

    var hour = zero(myDate.getHours());
    var minite = zero(myDate.getMinutes());
    var second = zero(myDate.getSeconds());

    return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return ({
            Y: year,
            m: month,
            d: day,
            H: hour,
            i: minite,
            s: second
        })[matches];
    });
}

/**
 * 对象数组分组
 * @param {*} arr  原始数组
 */
const groupBy = (arr, fn) =>
    arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
        acc[val] = (acc[val] || []).concat(arr[i]);
        return acc;
    }, {});

/**
 * 数组去重
 * @param {*} arr
 * @param {*} name 根据哪一项去重
 */
const filterArray = (arr, name) => {
    var hash = {};
    return arr.reduce(function (item, next) {
        hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
        return item;
    }, []);
}

/**
 * 深拷贝
 * @param {*} source
 */
const deepClone = source => {
    const targetObj = source.constructor === Array ? [] : {};
    for (let keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            } else {
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}


export {
    formatDate,
    filterArray,
    groupBy,
    deepClone,
}

