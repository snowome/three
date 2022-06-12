import * as THREE from 'three'
import scene from './scene.js'

const width = window.innerWidth
const height = window.innerHeight

const fov = 60
const aspect = width / height
const near = 1
const far = 3000
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(30, 80, 200)
camera.lookAt(scene.position)

export default camera
