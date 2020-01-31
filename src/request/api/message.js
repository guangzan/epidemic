// 新闻 信息相关
import base from './base'
import { get } from '../https'


const message = {
  // 病毒研究情况以及全国疫情概览
  overall() {
    return get(`${base.sq}/overall`);
  },

  // 新闻动态
  news(province, num) {
    return get(
      `${base.sq}/news`,
      { province, num }
    );
  }
}

export default message
