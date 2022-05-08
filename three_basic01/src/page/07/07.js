import 'babel-polyfill'
import '@/css/common.less'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height

const scene = new THREE.Scene()

const pointImg = require('./textures/particles/9.png')
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(pointImg)

const geometry = new THREE.SphereBufferGeometry(100, 20, 20)
const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 15,
    map: texture,
    alphaMap: texture,
    transparent: true,
    depthWrite: false,                      // 渲染此材质是否对深度缓冲区有任何影响。默认为true。
    blending: THREE.AdditiveBlending,       // 在使用此材质显示对象时要使用何种混合
    // sizeAttenuation: false
})
const pints = new THREE.Points(geometry, material)
pints.position.set(0, 0, 0)
scene.add(pints)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
scene.add(directionalLight)
directionalLight.position.set(180, 90, 30)
// directionalLight.castShadow = true
directionalLight.shadow.radius = 30     // 模糊度
directionalLight.shadow.mapSize.set(1024, 1024)     // 阴影分辨率
directionalLight.shadow.camera.near = 150;
directionalLight.shadow.camera.far = 300;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.bottom = -50;
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
var directionalLightHelper=new THREE.DirectionalLightHelper(directionalLight, 50, 0xff0000)
scene.add(directionalLightHelper)
const ambient = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambient)

const camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000)
camera.position.set(150, 200, 400)
camera.lookAt(scene.position)
scene.add(camera)

const axesHelper = new THREE.AxesHelper(1300)
scene.add(axesHelper)

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
