import * as THREE from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { template } from 'lodash-es'

import {camera} from './camera.js'
import {scene} from './scene.js'
import {granaryList} from './model.js'
import messageData from '@/api/messageData.js'

const tpl = require('@/layout/granary-detail/granary-detail.tpl')

const bgImg = require('@/layout/granary-detail/信息背景.png')
const temperatureImg = require('@/layout/granary-detail/温度.png')

const beanRed = require('@/layout/granary-detail/豆子/红豆.png')
const beanGreen = require('@/layout/granary-detail/豆子/绿豆.png')
const beanYello = require('@/layout/granary-detail/豆子/黄豆.png')
const beanBlack = require('@/layout/granary-detail/豆子/黑豆.png')

let chooseMesh = null
function chooseFunc(event) {
    if (chooseMesh) {
        chooseMesh.material.color.set(0xffffff)
    }

    const sx = event.clientX
    const sy = event.clientY

    const x = (sx / window.innerWidth) * 2 - 1
    const y = -(sy / window.innerHeight) * 2 + 1

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
    const intersects = raycaster.intersectObjects(granaryList)
    if (intersects.length) {
        chooseMesh = intersects[0].object
        chooseMesh.material.color.set(0x00ffff)
    } else {
        chooseMesh = null
    }

}

const cssMesh = createCssMesh('granary-detail')
scene.add(cssMesh)

window.addEventListener('click', function (event) {
    chooseFunc(event)

    if (chooseMesh === null) {
        cssMesh.element.style.visibility = 'hidden'
    }

    if (chooseMesh) {
        const _data = messageData[chooseMesh.name]

        const _grainImg = _data.grainImg
        let grainImg
        if (_grainImg.indexOf('红豆') > -1) {
            grainImg = beanRed
        } else if (_grainImg.indexOf('绿豆') > -1) {
            grainImg = beanGreen
        } else if (_grainImg.indexOf('黄豆') > -1) {
            grainImg = beanYello
        } else if (_grainImg.indexOf('黑豆') > -1) {
            grainImg = beanBlack
        }
        const data = {
            grain: _data.grain,                 // 黄豆
            grainHeight: _data.grainHeight,     // 3.8
            grainImg: grainImg,
            granaryHeight: _data.grainHeight,   // 8
            granaryName: _data.granaryName,     // 平房仓 P_05
            temperature: _data.temperature,     // 34.8
            weight: _data.weight,               // 3300
            bgImg,
            temperatureImg,
        }
        const compiled = template(tpl)(data)
        document.getElementById('granary-detail').innerHTML = compiled
        cssMesh.element.style.visibility = 'visible'
        cssMesh.position.copy(chooseMesh.position)
        const weightEle = document.getElementById('weight')
        weightEle.innerText = 0 + ' t'
        const weightMax = _data.weight
        let weight = 0
        let interval = setInterval(function () {
            weight += Math.floor(weightMax / 50)
            if (weight > weightMax) {
                weight = weightMax
                clearInterval(interval)
            }
            weightEle.innerHTML = weight + ' t'
        }, 5)


    }
})

function createCssMesh(id) {
    var dom = document.getElementById(id);
    dom.style.pointerEvents = 'none'
    const mesh = new CSS2DObject(dom)
    return mesh
}
