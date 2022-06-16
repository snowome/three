import {scene} from './scene.js'
import {renderAnimateFram} from './renderer.js'

const startRotateImg = require('@/layout/btn-side/旋转.png')
const endRotateImg = require('@/layout/btn-side/停止旋转.png')

const btn = document.getElementById('left-side__rotate')
btn.addEventListener('click', () => {
    if (renderAnimateFram.isRotate) {
        btn.querySelector('img').src = startRotateImg
    } else {
        btn.querySelector('img').src = endRotateImg
    }
    renderAnimateFram.isRotate = !renderAnimateFram.isRotate
})
