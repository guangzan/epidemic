/**
 * 数据
 */

import base from './base'
import { get } from '../https'


const message = {
  // 病毒研究情况以及全国疫情概览
  overall() {
    return get(`${base.sq}/overall`);
  }
}

export default message
