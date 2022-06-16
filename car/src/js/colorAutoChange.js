import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import {carGroup} from './model.js'

const colorList16 = [0x023911, 0x222222, 0x6a030a, 0x000000, 0xffffff]
const colorList = []

// 转为10进制
for (let i = 0; i < colorList16.length; i++) {
    const color = new THREE.Color(colorList16[i])
    colorList.push({
        r: color.r,
        g: color.g,
        b: color.b,
    })
}

const color = {
    r: colorList[0].r,
    g: colorList[0].g,
    b: colorList[0].b,
}

const tweenArr = []
for (let i = 0; i < colorList.length; i++) {
    const tween1 = new TWEEN.Tween(color)
    tween1.to({
        r: colorList[i].r,
        g: colorList[i].g,
        b: colorList[i].b,
    }, 2000)
    tween1.onUpdate(() => {
        setColor(color.r, color.g, color.b)
    })

    const tween2 = new TWEEN.Tween(color)
    if (i < colorList.length - 1) {
        tween2.to({
            r: colorList[i + 1].r,
            g: colorList[i + 1].g,
            b: colorList[i + 1].b,
        }, 500)
    } else {
        tween2.to({
            r: colorList[0].r,
            g: colorList[0].g,
            b: colorList[0].b,
        }, 500)
    }
    tween2.onUpdate(() => {
        setColor(color.r, color.g, color.b)
    })

    tweenArr.push(tween1, tween2)
}

for (let i = 0; i < tweenArr.length - 1; i++) {
    tweenArr[i].chain(tweenArr[i + 1])
}
tweenArr[tweenArr.length - 1].chain(tweenArr[0])

tweenArr[0].start()

function setColor(r, g, b) {
    carGroup.traverse(model => {
        if (model.type === 'Mesh') {
            if (model.name.slice(0, 2) === '外壳') {
                model.material.color.setRGB(r, g, b)
            }
        }
    })
}

const colorAutoChange = tweenArr[0]

const colorTweenState = {
    value: true
}
const btn = document.getElementById('right-side__color')
btn.addEventListener('click', function () {
    if (colorTweenState.value) {
        colorAutoChange.stop()
        document.getElementById('right-side__color-text').innerText = '自动变色'
    } else {
        colorAutoChange.start()
        document.getElementById('right-side__color-text').innerText = '停止变色'
    }
    colorTweenState.value = !colorTweenState.value
})

export {
    colorAutoChange,
    colorTweenState
}
