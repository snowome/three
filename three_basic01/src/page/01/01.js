import 'babel-polyfill'
import '@/css/common.less'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import GSAP from 'gsap'
import * as DatGui from 'dat.gui'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshBasicMaterial({
    color: 0xffff00
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const gui = new DatGui.GUI()
gui.add(mesh.position, 'y')
    .min(0)
    .max(5)
    .step(0.1)
    .name('y轴')
    .onChange(val => {
    })
    .onFinishChange(val => {
        console.log(`y轴修改成了：${val}`)
    })
const params = {
    color: '#ffff00',
    fn: () => {
        GSAP.to(mesh.position, {x: 1, duration: 2, yoyo: true, repeat: -1})
    }
}

gui.addColor(params, 'color')
    .onChange(color => {
        mesh.material.color.set(color)
    })
gui.add(mesh, 'visible').name('是否显示')
gui.add(params, 'fn', '立方体运动')
const folder = gui.addFolder('设置立方体')
folder.add(mesh.material, 'wireframe')

const axesHelper = new THREE.AxesHelper(200)
scene.add(axesHelper)

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
camera.position.set(0, 0, 10)
camera.lookAt(scene.position)
scene.add(camera)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.setClearColor(0x000000, 1)
document.body.appendChild(renderer.domElement)
const animate1 = GSAP.to(mesh.position, {
    x: 5,
    duration: 5,
    ease: 'bounce.out',
    repeat: 2,  // -1是无限循环
    yoyo: true, // 往返移动
    delay: 2,   // 延迟2秒移动
    onStart: () => {
        console.log('动画开始')
    },
    onComplete: () => {
        console.log('动画完成')
    }
})
GSAP.to(mesh.rotation, {
    x: Math.PI * 2,
    duration: 5,
    ease: 'bounce.out',
    repeat: -1,
})
window.addEventListener('click', function () {
    const status = animate1.isActive()
    if (status) {
        animate1.pause()
    } else {
        animate1.resume()
    }
}, false)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
// controls.addEventListener('change', render)

const clock = new THREE.Clock()
function render() {
    controls.update()
    const deltaTime = clock.getDelta()
    renderer.render(scene, camera)

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
})

renderer.domElement.addEventListener('dblclick', function () {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        renderer.domElement.requestFullscreen()
    }
    return false
}, false)




