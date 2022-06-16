import { template } from 'lodash-es'
import './btn-side.scss'

const buttonTpl = require('./btn-side.tpl')

const rotateImg = require('./停止旋转.png')
const lightImg = require('./开车灯.png')
const colorImg = require('./变色.png')


const data = {
    rotateImg,
    lightImg,
    colorImg
}
const compiled = template(buttonTpl)(data)



document.getElementById('btn-side').innerHTML = compiled

