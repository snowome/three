import * as THREE from 'three'

const width = window.innerWidth
const height = window.innerHeight

const fov = 60
const aspect = width / height
const near = 1
const far = 3000
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(-362, 270, 386)

// camera.lookAt(scene.position)    写在这里报错，移动到了renderer.js里

export { camera }
