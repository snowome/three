import * as THREE from 'three'
import {
    directionalLight_1,
    directionalLightHelper_1,
    directionalLight_2,
    directionalLightHelper_2,
    ambientLight,
} from './light.js'
import {axesHelper} from './helper.js'

import {granaryGroup} from './model.js'


const scene = new THREE.Scene()


scene.add(directionalLight_1)
// scene.add(directionalLightHelper_1)
scene.add(directionalLight_2)
// scene.add(directionalLightHelper_2)
scene.add(ambientLight)

// scene.add(axesHelper)

scene.add(granaryGroup)

scene.fog = new THREE.Fog(0x005577, 400, 1000)

export {scene}
