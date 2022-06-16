import * as THREE from 'three'
import {
    directionalLight_1,
    directionalLightHelper_1,
    directionalLight_2,
    directionalLightHelper_2,
    ambientLight,
} from './light.js'
import {axesHelper} from './helper.js'
// 汽车
import {carGroup} from './model.js'
// 地面
import {ground} from './ground.js'
// 隧道
import {tunnelGroup} from './tunnel.js'


const scene = new THREE.Scene()


scene.add(carGroup)
scene.add(ground)
scene.add(tunnelGroup)

scene.add(directionalLight_1)
// scene.add(directionalLightHelper_1)
scene.add(directionalLight_2)
// scene.add(directionalLightHelper_2)
scene.add(ambientLight)

// scene.add(axesHelper)

scene.fog = new THREE.Fog(0xcccccc, 800, 2600)

export {scene}
