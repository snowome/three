import * as THREE from 'three'
import {openCarLight, closeCarLight} from './carLight.js'
import {directionalLight_1, directionalLight_2, ambientLight} from './light.js'
import {scene} from './scene.js'
import {renderer} from './renderer.js'

const openLightImg = require('@/layout/btn-side/开车灯.png')
const closeLightImg = require('@/layout/btn-side/关车灯.png')

const btn = document.getElementById('left-side__light')
const btnImgEle = btn.querySelector('img')

let ligtState = false
btn.addEventListener('click', () => {
    if (ligtState) {
        closeCarLight()
        btnImgEle.src = openLightImg
        directionalLight_1.intensity = 0.8
        directionalLight_2.intensity = 0.8
        ambientLight.intensity = 0.9
        scene.fog = new THREE.Fog(0xcccccc, 800, 2600)
        renderer.setClearColor(0xcccccc, 1)
    } else {
        openCarLight()
        btnImgEle.src = closeLightImg
        directionalLight_1.intensity = 0.0
        directionalLight_2.intensity = 0.0
        ambientLight.intensity = 0.3
        scene.fog = new THREE.Fog(0x111111, 800, 2600)
        renderer.setClearColor(0x111111, 1)
    }
    ligtState = !ligtState
})


