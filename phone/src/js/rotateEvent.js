import * as THREE from 'three'
import rotateObjects from './rotateObjects.js'
import {choose} from './markEvent.js'

const pic = require('@/layout/rotate/旋转.png')
const picStop = require('@/layout/rotate/停止旋转.png')


const rotateBtn = document.getElementById('rotate-wrapper')

let animateFrame
const rotate = {
    bool: false
}
let markBackup = null
function render() {
    if (rotate.bool) {
        const phoneMark = rotateObjects.getObjectByName('手机标注')
        if (phoneMark) {
            if (markBackup == null) {
                markBackup = phoneMark.clone()
            }
            phoneMark.removeFromParent()
            document.body.removeEventListener('click', choose)
        }
        rotateObjects.rotateY(0.01)
    } else if (markBackup != null) {
        const phoneGroup = rotateObjects.getObjectByName('手机group')
        phoneGroup.add(markBackup)
        document.body.addEventListener('click', choose)
    }
    animateFrame = requestAnimationFrame(render)
}
render()

rotateBtn.addEventListener('click', function () {
    const rotateEle = document.getElementById('rotate-img')
    if (rotate.bool) {
        cancelAnimationFrame(animateFrame)
        rotateEle.src = pic
    } else {
        render()
        rotateEle.src = picStop
    }
    rotate.bool = !rotate.bool
}, false)
