import '@/css/common.scss'
import * as THREE from 'three'
import gsap from "gsap";
import * as DatGui from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {Water} from 'three/examples/jsm/objects/water2.js'

// import vertexShader from '@/shader/water/vertex.glsl'
// import fragmentShader from '@/shader/water/fragment.glsl'

const Water_1_M_Normal = require('./Water_1_M_Normal.jpg')
const Water_2_M_Normal = require('./Water_2_M_Normal.jpg')
const bgImage = require('./bg.hdr')
const yugangGLTF = require('./yugang.glb')

const Gui = new DatGui.GUI()
const textureLoader = new THREE.TextureLoader()
const rgbeLoader = new RGBELoader()
const gltfLoader = new GLTFLoader()

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height

const scene = new THREE.Scene()

// 加载场景
rgbeLoader.loadAsync(bgImage).then(texture => {
    // 设置纹理为圆柱形纹理
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    // scene.enviroment = texture
}).catch()

// 加载浴缸
gltfLoader.load(yugangGLTF, gltf => {
    const [yugang, waterGemotry] = gltf.scene.children
    yugang.material.side = THREE.DoubleSide
    scene.add(yugang)

    const waterPlane = new Water(
        waterGemotry.geometry,
        {
            color: 0xffffff,
            // 水纹的大小
            scale: 1,
            // 水纹流动的方向
            flowDirection: new THREE.Vector2(1, 1),
            // 水纹纹理的宽度
            textureWidth: 1024,
            // 水纹纹理的高度
            textureHeight: 1024,
            // 官方图片，导入报错，这里手动导入
            normalMap0: textureLoader.load(Water_1_M_Normal),
            normalMap1: textureLoader.load(Water_2_M_Normal),
        }
    )

    // waterPlane.rotateX(-Math.PI / 2)

    scene.add(waterPlane)
})




const axesHelper = new THREE.AxesHelper(2000)
scene.add(axesHelper)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(2, 3, 2)
scene.add(directionalLight)

const ambient = new THREE.AmbientLight(0xffffff, 0.9)
scene.add(ambient)

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
camera.position.set(0, 0.5, 0.7)
camera.lookAt(scene.position)
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
    // antialias: true
})
renderer.setSize(width, height)
renderer.setClearColor(0x000000, 1)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const clock = new THREE.Clock()
function render() {
    const elapsedTime = clock.getElapsedTime()
    // shaderMaterial.uniforms.u_time.value = elapsedTime
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
