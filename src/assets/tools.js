// formats格式包括
// 1. Y-m-d
// 2. Y-m-d H:i:s
// 3. Y年m月d日
// 4. Y年m月d日 H时i分
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

// Diagnose.vue 处理数据
const mergeData = arr => {
    var newArr = [];
    arr.forEach(item => {
        var dataItem = item
        if (newArr.length > 0) {
            var filterValue = newArr.filter(v => {
                return v.updateTime == dataItem.updateTime
            })
            if (filterValue.length > 0) {
                newArr.forEach(n => {
                    if (n.updateTime == filterValue[0].updateTime) {
                        n.confirmedCount = filterValue[0].confirmedCount + dataItem.confirmedCount
                    }
                })
            } else {
                newArr.push(dataItem)
            }
        } else {
            newArr.push(dataItem)
        }

    })
    return newArr
}

// Diagnose.vue 数组对象去重
// name 根据哪一项去重
const filterArray = (arr, name) => {
    var hash = {};
    return arr.reduce(function (item, next) {
        hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
        return item;
    }, []);
}


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
    mergeData,
    filterArray,
    deepClone
}

