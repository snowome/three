import 'babel-polyfill'
import '@/css/common.less'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height

const scene = new THREE.Scene()

const geometry = new THREE.BoxBufferGeometry(2, 2, 2)
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const redMaterial = material.clone()
redMaterial.color = new THREE.Color(1, 0, 0)
redMaterial.wireframe = false

const meshArr = []
for (let j = -5; j < 5; j++ ) {
    for (let k = -5; k < 5; k++) {
        for (let l = -5; l < 5; l++) {
            const meth = new THREE.Mesh(geometry, material)
            meth.position.set(j, k, l)
            scene.add(meth)
            meshArr.push(meth)
        }
    }
}


const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
scene.add(directionalLight)
directionalLight.position.set(20, 10, 0)

var directionalLightHelper=new THREE.DirectionalLightHelper(directionalLight, 3, 0xff0000)
scene.add(directionalLightHelper)
const ambient = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambient)

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
camera.position.set(10, 15, 30)
camera.lookAt(scene.position)
scene.add(camera)

const axesHelper = new THREE.AxesHelper(2000)
scene.add(axesHelper)

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
window.addEventListener('click', e => {
    mouse.x = (e.clientX / window.innerWidth) * 2 -1
    mouse.y = -((e.clientY / window.innerHeight) * 2 -1)
    raycaster.setFromCamera(mouse, camera)
    const result = raycaster.intersectObjects(meshArr)
    result.forEach(item => {
        item.object.material = redMaterial
    })
}, false)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.setClearColor(0x000000, 1)
// renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true


const clock = new THREE.Clock()
function render() {
    const time = clock.getElapsedTime()

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
