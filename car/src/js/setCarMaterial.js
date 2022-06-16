import * as THREE from 'three'
import {carGroup} from "./model";

const envImgNx = require('@/texture/envMap/nx.jpg')
const envImgNy = require('@/texture/envMap/ny.jpg')
const envImgNz = require('@/texture/envMap/nz.jpg')
const envImgPx = require('@/texture/envMap/px.jpg')
const envImgPy = require('@/texture/envMap/py.jpg')
const envImgPz = require('@/texture/envMap/pz.jpg')

const envCubeTexture = new THREE.CubeTextureLoader().load([envImgNx, envImgNy, envImgNz, envImgPx, envImgPy, envImgPz])
envCubeTexture.encoding = THREE.sRGBEncoding

function setCarMaterial(carModel) {
    carModel.traverse(model => {
        if (model.type === 'Mesh') {
            if (model.name.slice(0, 4) === '高光金属') {
                model.material = new THREE.MeshStandardMaterial({
                    color: model.material.color,
                    metalness: 1,
                    roughness: 0.2,
                    envMapIntensity: 0.4,
                })
            } else if (model.name.slice(0, 2) === '外壳') {
                model.material = new THREE.MeshPhysicalMaterial({
                    color: 0x023911,
                    clearcoat: 1.0,             // 透明涂层的强度
                    clearcoatRoughness: 0.02,   // 透明涂层的粗糙度
                    metalness: 0.9,
                    roughness: 0.7,
                    envMapIntensity: 1.2,

                })
            } else if (model.name.slice(0, 2) === '玻璃') {
                model.material = new THREE.MeshPhysicalMaterial({
                    color: 0x333333,
                    metalness: 0,
                    roughness: 0,
                    transparent: true,
                    transmission: 1.0,          // 透光性，范围从0.0到1.0。默认值是0.0
                    thickness: 0.2,             // 厚度
                    side: THREE.DoubleSide,
                    envMapIntensity: 1.0,
                })
            } else if (model.name.slice(0, 3) === '后视镜') {
                model.material = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    metalness: 1,
                    roughness: 0,
                    envMapIntensity: 1,
                })
            } else if (model.name.slice(0, 2) === '轮胎') {
                model.material.color.set(0x000000)
                model.material.metalness = 0
                model.material.roughness = 0.6
                model.material.normalScale.set(6.0, 6.0)        // 法线贴图对材质的影响程度。典型范围是0-1。默认值是Vector2设置为（1,1）
            } else if (model.name.slice(0, 3) === '前灯罩') {
                model.material = new THREE.MeshPhysicalMaterial({
                    color: 0x666666,
                    metalness: 0,
                    roughness: 0,
                    transparent: true,
                    transmission: 0.95,
                    envMapIntensity: 2.5,
                })
            } else if (model.name.slice(0, 4) === '尾灯灯罩') {
                model.material = new THREE.MeshPhysicalMaterial({
                    color: 0xff0000,
                    metalness: 0,
                    roughness: 0,
                    transmission: 1,
                    transparent: true,
                    envMapIntensity: 2.5,
                })
            } else if (model.name.slice(0, 5) === '尾灯第二层') {
                model.material = new THREE.MeshPhysicalMaterial({
                    color: 0x440000,
                    metalness: 0,
                    roughness: 0,
                    transmission: 0.5,
                    transparent: true
                })
            } else if (model.name.slice(0, 4) === '尾灯发光') {
                model.material = new THREE.MeshLambertMaterial({
                    color: 0x660000,
                })
            } else if (model.name.slice(0, 5) === '尾灯第三层') {
                model.material = new THREE.MeshLambertMaterial({
                    color: 0x190000,
                })
            } else if (model.name === '天窗黑玻璃') {
                model.material = new THREE.MeshPhysicalMaterial({
                    color: 0x111111,
                    metalness: 0,
                    roughness: 0,
                    envMapIntensity: 0.2,
                    transmission: 1.0,
                    transparent: true,
                    opacity: 1.0,
                    thickness: 2,
                })
            } else if (model.name === '白塑料') {
                model.material = new THREE.MeshPhysicalMaterial({
                    color: 0x010101,
                    metalness: 0.0,
                    roughness: 0.8,
                    envMapIntensity: 1.0,
                })
            } else if (model.name === '车座') {
                model.material = new THREE.MeshPhysicalMaterial({
                    color: 0x020202,
                    metalness: 0,
                    roughness: 0.6,
                    envMapIntensity: 1,
                })
            }

            model.material.envMap = envCubeTexture
        }
    })

    return carModel
}

export {
    setCarMaterial
}
