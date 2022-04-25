import '../css/common.css'
import * as THREE from 'three'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshBasicMaterial({
    color: 0xffffff
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const width = window.innerWidth
const height = window.innerHeight
const k = width / height

const camera = new THREE.PerspectiveCamera(75, k, 0.1, 1000)
camera.position.set(0, 0, 10)
camera.lookAt(scene.position)
scene.add(camera)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.setClearColor(0xb9d3ff, 1)
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)





