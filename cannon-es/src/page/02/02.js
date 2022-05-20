import '@/css/common.scss'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import GSAP from 'gsap'
import * as CANNON from 'cannon-es'
const mp3 = require('./metalHit.mp3')
const audio = new Audio()
audio.src = mp3

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height

const scene = new THREE.Scene()
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0),      // 重力
})
const cubeMaterial = new CANNON.Material('sphere')       // sphere是给材质起了个名字

const cubeArr = []
function createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({
        color: 0xffff00
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    scene.add(mesh)

    const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))        // 宽高等要设置BoxGeometry的一半，所以这里狮0.5
    const cubeBody = new CANNON.Body({
        shape: cubeShape,
        material: cubeMaterial,
        position: new CANNON.Vec3(0, 0, 0),
        mass: 1         // 质量
    })
    cubeBody.applyLocalForce(       // 给物体施加作用力
        new CANNON.Vec3(180, 0, 0),  // 力的大小
        new CANNON.Vec3(0, 0, 0),   // 力作用的位置，这里狮中心
    )
    world.addBody(cubeBody)
    function HitEvent(e) {  // 碰撞监听
        const impactStrength = e.contact.getImpactVelocityAlongNormal()
        if (impactStrength > 2) {
            audio.currentTime = 0
            const volume = impactStrength / 50
            if (volume > 1) {
                volume = 1
            }
            audio.volume = volume
            audio.play()
            console.log(impactStrength)
        }
    }
    cubeBody.addEventListener('collide', HitEvent, false)
    cubeArr.push({
        mesh: mesh,
        body: cubeBody
    })
}

window.addEventListener('click', createCube)

const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 12),
    new THREE.MeshStandardMaterial({
        color: 0x999999
    })
)
floor.rotateX(-Math.PI / 2)
floor.position.y -= 5
floor.receiveShadow = true
scene.add(floor)

const floorShape = new CANNON.Plane()
const floorMaterial = new CANNON.Material('floor')       // floor是给材质起的名字
const floorBody = new CANNON.Body()
floorBody.mess = 0  //质量为0，则物体保持不动
floorBody.addShape(floorShape)
floorBody.material = floorMaterial
floorBody.position.set(0, -5, 0)
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI/2)     // X轴旋转
world.addBody(floorBody)


// 设置两种材质碰撞的参数
const contactMaterial = new CANNON.ContactMaterial(cubeMaterial, floorMaterial, {
    friction: 0.2,      // 摩擦力
    restitution: 0.6,   // 弹性
})
world.addContactMaterial(contactMaterial)
// 设置 world碰撞的默认材料，如果没有设置，都用这个
world.defaultContactMaterial = contactMaterial

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(3, 5, -2)
directionalLight.castShadow = true

directionalLight.shadow.radius = 14     // 模糊度
directionalLight.shadow.mapSize.set(512, 512)     // 阴影分辨率
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 13;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -3;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;

scene.add(directionalLight)

var directionalLightHelper=new THREE.DirectionalLightHelper(directionalLight, 1, 0xff0000)
scene.add(directionalLightHelper)

const ambient = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambient)

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100)
camera.position.set(2, 5, 16)
camera.lookAt(scene.position)
scene.add(camera)

const axesHelper = new THREE.AxesHelper(2000)
scene.add(axesHelper)


const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.setClearColor(0x000000, 1)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

const clock = new THREE.Clock()
function render() {
    const deltaTime = clock.getDelta()
    controls.update()
    world.step(1/160, deltaTime)
    cubeArr.forEach(item => {
        item.mesh.position.copy(item.body.position)
        item.mesh.quaternion.copy(item.body.quaternion)
    })
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
