import 'babel-polyfill'
import '@/css/common.less'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height

const scene = new THREE.Scene()

const snowImg = require('./textures/particles/14.png')
const monthImg = require('./textures/particles/6.png')
const starImg = require('./textures/particles/10.png')

const textureLoader = new THREE.TextureLoader()
const snowTexture = textureLoader.load(snowImg)
const monthTexture = textureLoader.load(monthImg)
const starTexture = textureLoader.load(starImg)

const snowPoints = createPoint(snowTexture, 30)
scene.add(snowPoints)
const monthPoints = createPoint(monthTexture, 20)
scene.add(monthPoints)
const atarPoints = createPoint(starTexture, 45)
scene.add(atarPoints)

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

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
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

function createPoint(texture, size) {
    const particlesGeometry = new THREE.BufferGeometry()
    const count = 20000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = Math.random() * 10000 - 5000
        positions[i+1] = Math.random() * 8000 - 4000
        positions[i+2] = Math.random() * 1600 - 800
        colors[i] = Math.random()
        colors[i+1] = Math.random()
        colors[i+2] = Math.random()
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        vertexColors: true, // 启用定点颜色
        size: size,
        map: texture,
        alphaMap: texture,
        transparent: true,
        depthWrite: false,                      // 渲染此材质是否对深度缓冲区有任何影响。默认为true。
        blending: THREE.AdditiveBlending,       // 在使用此材质显示对象时要使用何种混合
        // sizeAttenuation: false
    })
    const points = new THREE.Points(particlesGeometry, material)
    points.position.set(0, 0, 0)
    return points
}

const clock = new THREE.Clock()
function render() {
    const time = clock.getElapsedTime()
    snowPoints.rotation.x = time * 0.3
    snowPoints.rotation.y = time * 0.1
    monthPoints.rotation.x = time * 0.2
    atarPoints.rotation.x = time * 0.1
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
