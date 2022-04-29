import 'babel-polyfill'
import '@/css/common.less'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const group = new THREE.Group()
for (let j = 0; j < 50; j++) {
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array(9)
    const vw = 50
    for (let k = 0; k < 9; k++) {
        vertices[k] = Math.random() * vw - vw / 2
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    const color = new THREE.Color(Math.random(), Math.random(), Math.random())
    const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color,
        transparent: true,
        opacity: 0.8
    })
    const mesh = new THREE.Mesh(geometry, material)
    const k = 200
    // mesh.position.set(new THREE.Vector3(Math.random() * 200, Math.random() * 200, Math.random() * 200))
    const x = Math.random() * k - k / 2
    const y = Math.random() * k - k / 2
    const z = Math.random() * k - k / 2
    mesh.position.set(x, y, z)
    group.add(mesh)
}
scene.add(group)
// const geometry = new THREE.BufferGeometry()
// const vertices = new Float32Array([
//     -20, -20, 20,
//     20, -20, 20,
//     20, 20, 20,
//     20, 20, 20,
//     -20, 20, 20,
//     -20, -20, 20
// ])
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
// const material = new THREE.MeshBasicMaterial({
//     color: 0xffff00,
//     side: THREE.DoubleSide
// })
//
// const meth = new THREE.Mesh(geometry, material)
// scene.add(meth)


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
renderer.setClearColor(0x0000, 1)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function render() {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()
