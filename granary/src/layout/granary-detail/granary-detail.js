import { template } from 'lodash-es'
import './granary-detail.scss'

const tpl =require('./granary-detail.tpl')

const data = {
    grain: '',            // 黄豆
    grainHeight: '',     // 3.8
    grainImg: '',
    granaryHeight: '',   // 8
    granaryName: '',     // 平房仓 P_05
    temperature: '',     // 34.8
    weight: '',          // 3300
    bgImg: '',
    temperatureImg: '',
}

const compiled = template(tpl)(data)

document.getElementById('granary-detail').innerHTML = compiled
