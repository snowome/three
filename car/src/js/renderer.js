import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import TWEEN from '@tweenjs/tween.js'
import {scene} from './scene.js'
import {camera} from './camera.js'
// import './gui.js'
import './colorBtnEvent.js'
import './colorAutoChange.js'
import './rotateEvent.js'
import './carLightEvent.js'

camera.lookAt(scene.position)

const width = window.innerWidth
const height = window.innerHeight


const renderer = new THREE.WebGLRenderer({
    antialias: true,
})
renderer.setClearColor(0xcccccc, 1)
renderer.setSize(width, height)
renderer.outputEncoding = THREE.sRGBEncoding

const controls = new OrbitControls(camera, renderer.domElement)
controls.enablePan = false
controls.minDistance = 300           // camera.position.length()
controls.maxDistance = 700
controls.maxPolarAngle = Math.PI / 2 * 0.92
controls.addEventListener('change', function () {
    // console.log(camera.position)
})

let renderAnimateFram = {
    value: null,
    isRotate: true
}
function render() {
    if(renderAnimateFram.isRotate) {
        scene.rotateY(0.001)
    }
    TWEEN.update()
    renderer.render(scene, camera)
    renderAnimateFram.value = requestAnimationFrame(render)
}
render()

window.addEventListener('resize', function () {
    const width = window.innerWidth
    const height = window.innerHeight
    // 更新宽高比
    camera.aspect = width / height
    // 更新摄像机投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器
    renderer.setSize(width, height)
    // 设置设备像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})

export {renderer, renderAnimateFram}
