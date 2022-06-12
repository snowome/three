import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { CSS3DObject, CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

const phoneGltf = require('@/texture/手机.glb')
const colorMap = require('@/texture/极光紫.png')
const metalnessMap = require('@/texture/metallic.png')
const roughnessMap = require('@/texture/roughness.png')
const normalMap = require('@/texture/normal.png')
const alphaMap = require('@/texture/opacity.png')

const envMapNx = require('@/texture/envMap/nx.jpg')
const envMapNy = require('@/texture/envMap/ny.jpg')
const envMapNz = require('@/texture/envMap/nz.jpg')
const envMapPx = require('@/texture/envMap/px.jpg')
const envMapPy = require('@/texture/envMap/py.jpg')
const envMapPz = require('@/texture/envMap/pz.jpg')

const markImg = require('@/texture/光点.png')

const gltfLoader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()
const cubeTexture = new THREE.CubeTextureLoader()
    .load([envMapNx, envMapNy, envMapNz, envMapPx, envMapPy, envMapPz])

const group = new THREE.Group()
group.name = '手机group'

gltfLoader.load(phoneGltf, function (gltf) {
    const phone = gltf.scene.getObjectByName('手机')
    phone.material = new THREE.MeshStandardMaterial({
        map: textureLoader.load(colorMap),
        metalness: 1,
        metalnessMap: textureLoader.load(metalnessMap),
        roughness: 1,
        roughnessMap: textureLoader.load(roughnessMap),
        normalMap: textureLoader.load(normalMap),
        transparent: true,
        alphaMap: textureLoader.load(alphaMap),
        envMap: cubeTexture,
        envMapIntensity: 0.9,
        depthWrite: true
    })
    phone.material.map.flipY = false
    phone.material.metalnessMap.flipY = false
    phone.material.roughnessMap.flipY = false
    phone.material.normalMap.flipY = false
    phone.material.alphaMap.flipY = false
    phone.rotateY(Math.PI)
    phone.rotateZ(Math.PI)
    phone.renderOrder = 0
    group.add(phone)

    const posObject = gltf.scene.getObjectByName('后置摄像头位置')
    const spriteMaterial = new THREE.SpriteMaterial({
        map: textureLoader.load(markImg),
        transparent: true
    })
    const mark = new THREE.Sprite(spriteMaterial)
    mark.name = '手机标注'
    mark.scale.set(6, 6, 1)
    const pos = new THREE.Vector3()
    posObject.getWorldPosition(pos)
    mark.position.copy(pos)
    mark.position.x -= 6
    mark.position.z -= 3
    mark.renderOrder = 1
    group.add(mark)

    const tagHTML = document.getElementById('camera-tag').innerHTML

    const tagEle = document.createElement('div')
    tagEle.className = 'camera-tag'
    tagEle.innerHTML = tagHTML

    const cameraTagByCss2 = new CSS2DObject(tagEle)
    cameraTagByCss2.position.copy(mark.position)
    group.add(cameraTagByCss2)

    // const cameraTagByCss3 = new CSS3DObject(tagEle)
    // cameraTagByCss3.scale.set(0.22, 0.22, 1)
    // cameraTagByCss3.rotateY(Math.PI)
    // cameraTagByCss3.position.copy(mark.position)
    // cameraTagByCss3.position.x += -504 * 0.22 / 2    //默认尺寸504 缩放0.22倍  平移504*0.22的一半
    // group.add(cameraTagByCss3)
})


export default group
