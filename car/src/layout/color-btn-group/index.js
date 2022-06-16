import { template } from 'lodash-es'
import './button.scss'

const buttonTpl = require('./button.tpl')

const green = require('./绿.jpg')
const grey = require('./灰.jpg')
const red = require('./红.jpg')
const black = require('./黑.jpg')
const white = require('./白.jpg')

const data = {
    green,
    grey,
    red,
    black,
    white,
}
const compiled = template(buttonTpl)(data)



document.getElementById('color-btn-group').innerHTML = compiled

