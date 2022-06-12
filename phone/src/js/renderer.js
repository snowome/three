import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import scene from './scene.js'
import phone from './phone.js'
import camera from './camera'
// import gui from './gui.js'
import './btnEvent.js'
import './rotateEvent.js'
import './markEvent.js'

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer({
    antialias: true,
})
renderer.setClearColor(0x000000, 1)
renderer.setSize(width, height)

const css2Render = new CSS2DRenderer()
css2Render.setSize(width, height)
const css2RenderEle = css2Render.domElement
css2RenderEle.id = 'css2Render'
css2RenderEle.style.position = 'absolute'
css2RenderEle.style.top = 0
css2RenderEle.style.left = '252px'  //HTML标签尺寸宽度一半
css2RenderEle.style.display = 'none'
// css2RenderEle.style.pointerEvents = 'none'

const css3Render = new CSS3DRenderer()
css3Render.setSize(width, height)
const css3RenderEle = css3Render.domElement
css3RenderEle.style.position = 'absolute'
css3RenderEle.style.top = 0
css3RenderEle.style.left = 0
css3RenderEle.style.pointerEvents = 'none'

const controls = new OrbitControls(camera, renderer.domElement)
controls.enablePan = false
controls.minDistance = 200
controls.maxDistance = 500
controls.addEventListener('change', function () {

})

let s = 0
function render() {
    // if (gui.rotateY) {
    //     phone.rotateY(0.01)
    // }
    // console.log(mark)
    const mark = phone.getObjectByName('手机标注')
    if (mark) {
        s += 0.01
        if (s < 0.5) {
            mark.scale.x = 6 * (1 + s)
            mark.scale.y = 6 * (1 + s)
        } else if (s >= 0.5 < 1) {
            mark.scale.x = 6 * (2 - s)
            mark.scale.y = 6 * (2 - s)
        } else {
            s = 0
        }
    }
    renderer.render(scene, camera)
    css2Render.render(scene, camera)
    css3Render.render(scene, camera)
    requestAnimationFrame(render)
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
    // CSS2DRenderer
    css2Render.setSize(width, height)
    // CSS3DRenderer
    css3Render.setSize(width, height)
})

export {renderer, css2Render, css3Render}
