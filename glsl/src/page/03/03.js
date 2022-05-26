import '@/css/common.scss'
import * as THREE from 'three'
import gsap from "gsap";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

import vertexShader from '@/shader/flylight/vertex.glsl'
import fragmentShader from '@/shader/flylight/fragment.glsl'

const grasslandImg = require('@/texture/grassland.hdr')
const flyLightFile = require('@/texture/flyLight.glb')

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height

const scene = new THREE.Scene()
const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync(grasslandImg).then(texture => {
    // 设置纹理为圆柱形纹理
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture
    scene.environment = texture
}).catch()

const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {},
    side: THREE.DoubleSide,
})

const gltfLoader = new GLTFLoader()
let flyLightBox = null
gltfLoader.loadAsync(flyLightFile).then(file => {
    const [light, body, foot] = file.scene.children
    file.scene.position.set(100, 40, 100)
    scene.add(file.scene)
    flyLightBox = body
    flyLightBox.material = shaderMaterial
    for (let i = 0; i < 150; i++) {
        const _boxScene = file.scene.clone(true)
        const _x = (Math.random() - 0.5) * 300
        const _z = (Math.random() - 0.5) * 300
        const _y = Math.random() * 60 + 25
        _boxScene.position.set(_x, _y, _z)
        gsap.to(_boxScene.rotation, {
            y: 2 * Math.PI,
            duration: 10 + Math.random() * 30,
            repeat: -1
        })
        gsap.to(_boxScene.position, {
            x: '+=' + Math.random(),
            y: '+=' + Math.random() * 10,
            duration: 5 + Math.random() * 20,
            yoyo: true,
            repeat: -1,
        })
        scene.add(_boxScene)
    }
}).catch()


const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(2, 3, 2)
scene.add(directionalLight)

const ambient = new THREE.AmbientLight(0xffffff, 0.9)
scene.add(ambient)

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
camera.position.set(0, 0, 4)
camera.lookAt(0, 1, 0)
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
    // antialias: true
})
renderer.setSize(width, height)
renderer.setClearColor(0x000000, 1)
// 定义渲染器的输出编码，设置完这个就可以设置曝光程度
renderer.outputEncoding = THREE.sRGBEncoding
// 色调映射的算法：这种选项常用（电影级别）
renderer.toneMapping = THREE.ACESFilmicToneMapping
// 色调映射的曝光级别
renderer.toneMappingExposure = 0.2
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 1, 0)
controls.autoRotate = true
controls.autoRotateSpeed = 0.2
// 你能够垂直旋转的角度的上限，范围是0到Math.PI，其默认值为Math.PI。
controls.maxPolarAngle = Math.PI
// 你能够垂直旋转的角度的下限，范围是0到Math.PI，其默认值为0。
controls.minPolarAngle = 0
const clock = new THREE.Clock()

function render() {
    controls.update()
    const elapsedTime = clock.getElapsedTime()
    renderer.render(scene, camera)
    camera.updateProjectionMatrix()
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
