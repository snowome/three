import 'babel-polyfill'
import '@/css/common.less'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const doorImg = require('./images/door.jpg')
const aplhaImg = require('./images/alpha.jpg')
const ambientOcclusionImg = require('./images/ambientOcclusion.jpg')
const heightImg = require('./images/height.jpg')
const roughnessImg = require('./images/roughness.jpg')
const metalnessImg = require('./images/metalness.jpg')
const normalImg = require('./images/normal.jpg')

const loadingManager = new THREE.LoadingManager(doorImg)
loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
}
loadingManager.onLoad = function ( ) {
    console.log( 'Loading complete!')
}
loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
}

loadingManager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url )
}

const textLoader = new THREE.TextureLoader(loadingManager)
const doorTexture = textLoader.load(doorImg)
const alphaTexture = textLoader.load(aplhaImg)
const aoTexture = textLoader.load(ambientOcclusionImg)
const displacementTexture = textLoader.load(heightImg)
const roughnessTexture = textLoader.load(roughnessImg)
const metalnessTexture = textLoader.load(metalnessImg)
const normalTexture = textLoader.load(normalImg)

const geometry = new THREE.BoxGeometry(160, 160, 160, 200, 200, 200)
geometry.setAttribute('uv2', geometry.getAttribute('uv'))       // aoMap需要第二组UV
const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    map: doorTexture,
    alphaMap: alphaTexture,
    transparent: true,
    side: THREE.DoubleSide,
    aoMap: aoTexture,
    aoMapIntensity: 1,
    displacementMap: displacementTexture, // 置换贴图需要设置几何体的细分数，否则不显示
    displacementScale: 10,
    roughnessMap: roughnessTexture,         // 粗超度贴图需要用透视相机，正交相机看不出效果
    roughness: 0.8,
    metalnessMap: metalnessTexture,         // 金属度贴图
    metalness: 0.6,
    normalMap: normalTexture
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
