import 'babel-polyfill'
import '@/css/common.less'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {LightProbeHelper} from 'three/examples/jsm/helpers/LightProbeHelper.js'

const scene = new THREE.Scene()

const geometry = new THREE.SphereBufferGeometry(50, 20, 20)
const material = new THREE.MeshStandardMaterial({
})

const mesh = new THREE.Mesh(geometry, material)
mesh.castShadow = true
scene.add(mesh)


const planeGeometry = new THREE.PlaneGeometry(2000, 2000)
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0x999999,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.receiveShadow = true
plane.translateY(-50)
plane.rotateX(-Math.PI/2)
scene.add(plane)

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height


// 平行光
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// scene.add(directionalLight)
// directionalLight.position.set(120, 90, 0)
// directionalLight.castShadow = true
// directionalLight.shadow.radius = 30     // 模糊度
// directionalLight.shadow.mapSize.set(1024, 1024)     // 阴影分辨率
// directionalLight.shadow.camera.near = 150;
// directionalLight.shadow.camera.far = 300;
// directionalLight.shadow.camera.top = 50;
// directionalLight.shadow.camera.bottom = -50;
// directionalLight.shadow.camera.left = -50;
// directionalLight.shadow.camera.right = 50;
// var directionalLightHelper=new THREE.DirectionalLightHelper(directionalLight, 50, 0xff0000)
// scene.add(directionalLightHelper)

// 聚光灯
// const spotLight = new THREE.SpotLight(0xffffff, 10)
// spotLight.position.set(80, 190, 0)
// spotLight.target = mesh
// spotLight.castShadow = true
// spotLight.angle = Math.PI / 4
// spotLight.shadow.radius = 30
// spotLight.shadow.mapSize.set(2048, 2048)
// spotLight.distance = 3000
// spotLight.decay = 0.2
// spotLight.penumbra = 0.5
// scene.add(spotLight)
// const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0xffffff)
// scene.add(spotLightHelper)

const color = 0x69c0ff
const pointLight = new THREE.PointLight(color, 10)
pointLight.castShadow = true
pointLight.shadow.radius = 30
pointLight.shadow.mapSize.set(2048, 2048)
pointLight.distance = 3000
pointLight.decay = 0.2
pointLight.penumbra = 0.5
const smallBall = new THREE.Mesh(
    new THREE.SphereBufferGeometry(3, 28, 28),
    new THREE.MeshBasicMaterial({ color: color })
)
smallBall.position.set(80, 180, 0)
smallBall.add(pointLight)
scene.add(smallBall)
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 4, 0xffffff)
// scene.add(pointLightHelper)


const ambient = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambient)

const camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);
camera.position.set(150, 200, 400)
camera.lookAt(mesh.position)
scene.add(camera)

const axesHelper = new THREE.AxesHelper(200)
scene.add(axesHelper)

const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper);

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.setClearColor(0x000000, 1)
renderer.physicallyCorrectLights = true     // 是否使用物理上正确的光照模式。 默认是false。
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const clock = new THREE.Clock()
function render() {
    const time = clock.getElapsedTime()
    smallBall.position.x = Math.sin(time) * 120
    smallBall.position.z = Math.cos(time) * 120
    smallBall.position.y = 180 + Math.sin(time * 3) * 60

    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()
