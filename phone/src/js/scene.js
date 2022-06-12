import * as THREE from 'three'
// import phone from './phone.js'
// import arc360 from './arc360.js'
import rotateObjects from './rotateObjects.js'
import {
    directionalLight_1,
    directionalLightHelper_1,
    directionalLight_2,
    directionalLightHelper_2,
    ambientLight,
} from './light.js'
import {axesHelper} from './helper.js'

const scene = new THREE.Scene()

// 手机
// scene.add(phone)
// 圆弧，上边写的文字720
// scene.add(arc720)
scene.add(rotateObjects)

scene.add(directionalLight_1)
// scene.add(directionalLightHelper_1)
scene.add(directionalLight_2)
// scene.add(directionalLightHelper_2)
scene.add(ambientLight)

// scene.add(axesHelper)
export default scene
