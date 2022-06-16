import * as THREE from 'three'
import {carGroup} from './model.js'
import {colorAutoChange, colorTweenState} from './colorAutoChange.js'

const colorList = [
    { name: 'green', value: 0x023911 },
    { name: 'grey', value: 0x222222 },
    { name: 'red', value: 0x6a030a },
    { name: 'black', value: 0x000000 },
    { name: 'white', value: 0xffffff },
]

colorList.forEach((color, index) => {
    const _color = color.value
    const btn = document.getElementById(`color${index + 1}`)
    btn.addEventListener('click', () => {
        colorAutoChange.stop()
        colorTweenState.value = false
        document.getElementById('right-side__color-text').innerText = '自动变色'
        setColor(_color)
    })
})

function setColor(color) {
    carGroup.traverse(model => {
        if (model.type === 'Mesh') {
            if (model.name.slice(0, 2) === '外壳') {
                model.material.color.set(color)
            }
        }
    })
}
