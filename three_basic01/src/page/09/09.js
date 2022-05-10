import 'babel-polyfill'
import '@/css/common.less'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const snowImg = require('./textures/particles/14.png')
const textureLoader = new THREE.TextureLoader()
const snowTexture = textureLoader.load(snowImg)

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height

const scene = new THREE.Scene()


const params = {
    count: 20000,
    size: 5,
    radius: 800,
    branch: 3,
    color: '#ff6030',
    endColor: '#eb3984',
    rotateScale: 0.001,
}
let geometry = null, material = null
const centerColor = new THREE.Color(params.color)
const endColor = new THREE.Color(params.endColor)

const generateGalaxy = () => {
    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(params.count * 3)
    const vertexColors = new Float32Array(params.count * 3)

    for (let i = 0; i < params.count; i++) {
        const branchAngle = (i % params.branch) * (2 * Math.PI / params.branch)
        const distance = Math.random() * params.radius * Math.pow(Math.random(), 3)
        const randomX = Math.pow((Math.random() * 2 - 1) * 5, 3) * (params.radius - distance) / 300
        const randomY = Math.pow((Math.random() * 2 - 1) * 5, 3) * (params.radius - distance) / 300
        const randomZ = Math.pow((Math.random() * 2 - 1) * 5, 3) * (params.radius - distance) / 300
        const angleRandom = branchAngle + distance * params.rotateScale
        const current = i * 3
        positions[current] = distance * Math.cos(angleRandom) + 0 * Math.sin(angleRandom) + randomX
        positions[current + 1] = 0 + randomY
        positions[current + 2] = 0 * Math.cos(angleRandom) - distance * Math.sin(angleRandom) + randomZ

        const mixColor = centerColor.clone()
        mixColor.lerp(endColor, distance / params.radius)
        vertexColors[current] = mixColor.r
        vertexColors[current + 1] = mixColor.g
        vertexColors[current + 2] = mixColor.b
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(vertexColors, 3))
    material = new THREE.PointsMaterial({
        vertexColors: true,
        map: snowTexture,
        alphaMap: snowTexture,
        transparent: true,
        size: params.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    })
    const points = new THREE.Points(geometry, material)
    return points
}
const galaxy = generateGalaxy()
scene.add(galaxy)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
scene.add(directionalLight)
directionalLight.position.set(180, 600, 1130)

var directionalLightHelper=new THREE.DirectionalLightHelper(directionalLight, 50, 0xff0000)
scene.add(directionalLightHelper)
const ambient = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambient)

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 5000)
camera.position.set(600, 400, 1400)
camera.lookAt(scene.position)
scene.add(camera)

const axesHelper = new THREE.AxesHelper(5000)
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
