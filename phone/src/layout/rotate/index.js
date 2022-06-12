import { template } from 'lodash-es'
import './rotate.scss'

const rotateTpl = require('./rotate.tpl')
const icon = require('./旋转.png')

const rotateEle = document.getElementById('rotate-wrapper')
rotateEle.style.left = (window.innerWidth - 26) / 2 + 'px'

window.addEventListener('resize', function () {
    rotateEle.style.left = (window.innerWidth - 26) / 2 + 'px'
}, false)

const data = {
    icon
}

const compiled = template(rotateTpl)(data)

document.getElementById('rotate-wrapper').innerHTML = compiled
