import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import TWEEN from '@tweenjs/tween.js'
import {scene} from './scene.js'
import {camera} from './camera.js'

import './chooseEvent.js'

camera.lookAt(scene.position)

const width = window.innerWidth
const height = window.innerHeight


const renderer = new THREE.WebGLRenderer({
    antialias: true,
})
renderer.setClearColor(0x005577, 1)
renderer.setSize(width, height)
renderer.outputEncoding = THREE.sRGBEncoding

const css2Renderer = new CSS2DRenderer()
css2Renderer.setSize(width, height)
const css2RenderEle = css2Renderer.domElement
css2RenderEle.style.position = 'absolute'
css2RenderEle.style.top = '200px'       //信息弹窗界面高度一半
css2RenderEle.style.left = '250px'      //信息弹窗界面宽度一半
css2RenderEle.style.pointerEvents = 'none'

const css3Renderer = new CSS3DRenderer()
css3Renderer.setSize(width, height)
const css3DRenderEle = css3Renderer.domElement
css3DRenderEle.style.position = 'absolute'
css3DRenderEle.style.top = '0px'
css3DRenderEle.style.left = '0px'
css3DRenderEle.style.pointerEvents = 'none'

const controls = new OrbitControls(camera, renderer.domElement)
// controls.enablePan = false
// controls.minDistance = 180           // camera.position.length()
controls.maxDistance = 400
controls.maxPolarAngle = Math.PI / 2 * 0.92
controls.addEventListener('change', function () {
    // console.log(camera.position)
})

let renderAnimateFram = {
    value: null,
}
function render() {
    renderer.render(scene, camera)
    css2Renderer.render(scene, camera)
    css3Renderer.render(scene, camera)
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
    css2Renderer.setSize(width, height)
    css3Renderer.setSize(width, height)
    // 设置设备像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})

export {renderer, renderAnimateFram, css2Renderer, css3Renderer}
