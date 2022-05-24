import '@/css/common.scss'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import patternVertexShader from '@/shader/pattern/vertex.glsl'
import patternFragmentShader from '@/shader/pattern/fragment.glsl'
const textureImg = require('@/texture/da.jpeg')

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height

const scene = new THREE.Scene()
const geometry = new THREE.PlaneBufferGeometry(1, 1, 64, 64)

const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: patternVertexShader,
    fragmentShader: patternFragmentShader,
    uniforms: {
        u_time: {
            value: 0
        },
        // 波浪的频率
        u_frequency: {
            value: 10,
        },
        // 波浪的幅度
        u_scale: {
            value: 0.1,
        },
    },
    side: THREE.DoubleSide,
    transparent: true,
})

const mesh = new THREE.Mesh(geometry, shaderMaterial)
scene.add(mesh)



const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(2, 3, 2)
scene.add(directionalLight)

var directionalLightHelper=new THREE.DirectionalLightHelper(directionalLight, 1, 0xffffff)
scene.add(directionalLightHelper)

const ambient = new THREE.AmbientLight(0xffffff, 0.9)
scene.add(ambient)

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100)
camera.position.set(0, 0, 2)
camera.lookAt(scene.position)
scene.add(camera)

const axesHelper = new THREE.AxesHelper(2000)
scene.add(axesHelper)


const renderer = new THREE.WebGLRenderer({
    // antialias: true
})
renderer.setSize(width, height)
renderer.setClearColor(0x777777, 1)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

const clock = new THREE.Clock()
function render() {
    const elapsedTime = clock.getElapsedTime()
    shaderMaterial.uniforms.u_time.value = elapsedTime
    // controls.update()
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
