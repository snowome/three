import 'babel-polyfill'
import '@/css/common.less'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const doorImg = require('./images/door.jpg')
const ambientOcclusionImg = require('./images/ambientOcclusion.jpg')

const textLoader = new THREE.TextureLoader()
const doorTexture = textLoader.load(doorImg)
const aoTexture = textLoader.load(ambientOcclusionImg)

const geometry = new THREE.BoxBufferGeometry(160, 160, 160)
geometry.setAttribute('uv2', geometry.getAttribute('uv'))       // aoMap需要第二组UV
const material = new THREE.MeshBasicMaterial({
    map: doorTexture,
    aoMap: aoTexture,
    aoMapIntensity: 0.8,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height
const s = 200

const axesHelper = new THREE.AxesHelper(200)
scene.add(axesHelper)

const camera = new THREE.OrthographicCamera(-s * aspect, s * aspect, s, -s, 1, 1000)
camera.position.set(200, 300, 200)
camera.lookAt(scene.position)
scene.add(camera)

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
