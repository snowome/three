import 'babel-polyfill'
import '@/css/common.less'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const imgPX = require('./images/1/px.jpg')
const imgNX = require('./images/1/nx.jpg')
const imgPY = require('./images/1/py.jpg')
const imgNY = require('./images/1/ny.jpg')
const imgPZ = require('./images/1/pz.jpg')
const imgNZ = require('./images/1/nz.jpg')

const imgHdr = require('./images/004.hdr')
console.log(imgHdr)

const scene = new THREE.Scene()

const textLoader = new THREE.CubeTextureLoader()
const envTexture = textLoader.load([
    imgPX, imgNX, imgPY, imgNY, imgPZ, imgNZ
])

const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync(imgHdr).then(texture => {
    // 设置纹理为圆柱形纹理
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // 添加天空环境
    scene.background = texture;
    scene.environment = texture;
}).catch()


const geometry = new THREE.SphereBufferGeometry(100, 20, 20)
const material = new THREE.MeshStandardMaterial({
    metalness: 0.7,
    roughness: 0.1,
    // envMap: envTexture
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
scene.background = envTexture
scene.environment = envTexture

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height
const s = 200

const axesHelper = new THREE.AxesHelper(200)
scene.add(axesHelper)

const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
camera.position.set(200, 0, 300)
camera.lookAt(scene.position)
scene.add(camera)


const ambient = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambient)
const directionaLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionaLight.position.set(400, 200, 600)
scene.add(directionaLight)
const directionaLight2 = directionaLight.clone()
directionaLight2.position.set(-400, -200, -600)
scene.add(directionaLight2)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.setClearColor(0x000000, 1)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function render() {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()
