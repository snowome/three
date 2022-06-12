import { template } from 'lodash-es'
import './tag.scss'

const tagTpl = require('./tag.tpl')
const icon = require('./关闭.png')


const data = {
    icon
}

const compiled = template(tagTpl)(data)

document.getElementById('camera-tag').innerHTML = compiled
