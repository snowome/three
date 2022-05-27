import '@/css/common.scss'
import * as THREE from 'three'
import gsap from "gsap";
import * as DatGui from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

import vertexShader from '@/shader/water/vertex.glsl'
import fragmentShader from '@/shader/water/fragment.glsl'

// const grasslandImg = require('@/texture/grassland.hdr')
// const flyLightFile = require('@/texture/flyLight.glb')

const Gui = new DatGui.GUI()

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height

const scene = new THREE.Scene()

const params = {
    u_wareFrequency: 14,    // 频率
    u_range: 0.03,          // 幅度的倍数
    u_rangeXZ: 1.5,         // x、y轴上的幅度
    u_noiseFrequency: 10,   // 噪声的频率
    u_noiseRange: 1.5,      // 噪声的幅度
    u_lowColor: 0xff0000,   // 颜色渐变
    u_highColor: 0xffff00,  // 颜色渐变
    u_speedX: 1,            // x轴水流速度
    u_speedZ: 1,            // z轴水流速度
    u_noiseSpeed: 1,        // 噪声的速度
    u_opacity: 1,           // 透明度
}
const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        u_wareFrequency: {
            value: params.u_wareFrequency
        },
        u_range: {
            value: params.u_range
        },
        u_rangeXZ: {
            value: params.u_rangeXZ
        },
        u_noiseFrequency: {
            value: params.u_noiseFrequency
        },
        u_noiseRange: {
            value: params.u_noiseRange
        },
        u_time: {
            value: 0
        },
        u_lowColor: {
            value: new THREE.Color(params.u_lowColor)
        },
        u_highColor: {
            value: new THREE.Color(params.u_highColor)
        },
        u_speedX: {
            value: params.u_speedX
        },
        u_speedZ: {
            value: params.u_speedZ
        },
        u_noiseSpeed: {
            value: params.u_noiseSpeed
        },
        u_opacity: {
            value: params.u_opacity
        }
    },
    side: THREE.DoubleSide,
    transparent: true,
})

Gui.add(params, 'u_wareFrequency')
    .name('u_wareFrequency')
    .min(1)
    .max(100)
    .step(0.1)
    .onChange(val => {
        shaderMaterial.uniforms.u_wareFrequency.value = val
    })
Gui.add(params, 'u_range')
    .name('u_range')
    .min(0)
    .max(0.2)
    .step(0.001)
    .onChange(val => {
        shaderMaterial.uniforms.u_range.value = val
    })
Gui.add(params, 'u_noiseFrequency')
    .name('u_noiseFrequency')
    .min(1)
    .max(100)
    .step(0.1)
    .onChange(val => {
        shaderMaterial.uniforms.u_noiseFrequency.value = val
    })
Gui.add(params, 'u_noiseRange')
    .name('u_noiseRange')
    .min(0)
    .max(5)
    .step(0.01)
    .onChange(val => {
        shaderMaterial.uniforms.u_noiseRange.value = val
    })
Gui.add(params, 'u_rangeXZ')
    .name('u_rangeXZ')
    .min(0)
    .max(5)
    .step(0.1)
    .onChange(val => {
        shaderMaterial.uniforms.u_rangeXZ.value = val
    })
Gui.addColor(params, 'u_lowColor')
    .onFinishChange(val => {
        shaderMaterial.uniforms.u_lowColor.value = new THREE.Color(val)
    })
Gui.addColor(params, 'u_highColor')
    .onFinishChange(val => {
        shaderMaterial.uniforms.u_highColor.value = new THREE.Color(val)
    })
Gui.add(params, 'u_speedX')
    .min(0)
    .max(5)
    .step(0.01)
    .onChange(val => {
        shaderMaterial.uniforms.u_speedX.value = val
    })
Gui.add(params, 'u_speedZ')
    .min(0)
    .max(5)
    .step(0.01)
    .onChange(val => {
        shaderMaterial.uniforms.u_speedZ.value = val
    })
Gui.add(params, 'u_noiseSpeed')
    .min(0)
    .max(5)
    .step(0.01)
    .onChange(val => {
        shaderMaterial.uniforms.u_noiseSpeed.value = val
    })
Gui.add(params, 'u_opacity')
    .min(0)
    .max(1)
    .step(0.01)
    .onChange(val => {
        shaderMaterial.uniforms.u_opacity.value = val
    })

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 1024, 1024),
    shaderMaterial
)
plane.rotateX(-Math.PI / 2)

scene.add(plane)

// const rgbeLoader = new RGBELoader()
// rgbeLoader.loadAsync(grasslandImg).then(texture => {
//     // 设置纹理为圆柱形纹理
//     texture.mapping = THREE.EquirectangularReflectionMapping;
//     scene.background = texture
//     scene.environment = texture
// }).catch()

// const shaderMaterial = new THREE.ShaderMaterial({
//     vertexShader: vertexShader,
//     fragmentShader: fragmentShader,
//     uniforms: {},
//     side: THREE.DoubleSide,
// })

const axesHelper = new THREE.AxesHelper(2000)
scene.add(axesHelper)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(2, 3, 2)
scene.add(directionalLight)

const ambient = new THREE.AmbientLight(0xffffff, 0.9)
scene.add(ambient)

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
camera.position.set(0, 0.5, 0.7)
camera.lookAt(scene.position)
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
    // antialias: true
})
renderer.setSize(width, height)
renderer.setClearColor(0x000000, 1)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const clock = new THREE.Clock()
function render() {
    const elapsedTime = clock.getElapsedTime()
    shaderMaterial.uniforms.u_time.value = elapsedTime
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
