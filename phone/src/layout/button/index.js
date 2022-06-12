import { template } from 'lodash-es'
import './button.scss'

const buttonTpl = require('./button.tpl')

const black = require('./black.png')
const purple = require('./purple.png')
const blue = require('./blue.png')
const red = require('./red.png')

const data = {
    black,
    purple,
    blue,
    red,
}
const compiled = template(buttonTpl)(data)



document.getElementById('color-wrapper').innerHTML = compiled

