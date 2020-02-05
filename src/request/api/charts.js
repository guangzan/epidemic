/**
 * 数据相关
 */

import base from './base' // 导入接口域名列表
import { get } from '../https'

const charts = {
  // api/area
  // 返回自爬虫运行开始（2020年1月24日凌晨3:40）至今，
  // 中国所有省份、地区或直辖市及世界其他国家的所有疫情信息变化的时间序列数据（精确到市），
  // 能够追溯确诊/疑似感染/治愈/死亡人数的时间序列。
  // province	省份、地区或直辖市，如：湖北省、香港、北京市。
  // latest	1：返回最新数据（默认） 0：返回时间序列数据

  /**
   * 返回该省最新数据
   * @param {*} province 省份、地区或直辖市，如：湖北省、香港、北京市。
   */
  area(province) {
    return get(
      `${base.sq}/area`,
      { latest: 1, province }
    );
  },

  /**
   * 返回该省历史数据
   * @param {*} province 省份、地区或直辖市，如：湖北省、香港、北京市。
   */
  provinceDate(province) {
    return get(
      `${base.sq}/area`,
      { latest: 0, province }
    );
  },

  /**
   * 全国各省历史数据 (未使用)
   */
  provinceLatest() {
    return get(
      `${base.sq}/area`,
      { latest: 0 }
    );
  },

  /**
   * 全国数据各省当日数据
   */
  province() {
    return get(`${base.sq}/area`);
  },
}

export default charts
