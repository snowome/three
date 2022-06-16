// 创建一个地面
import * as THREE from 'three'

const brickImg = require('@/texture/瓷砖.jpg')

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(brickImg)
texture.encoding = THREE.sRGBEncoding
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(12, 12)

const geometry = new THREE.PlaneGeometry(6000, 6000)
const material = new THREE.MeshLambertMaterial({
    color: 0x222222,
    map: texture
})

const ground = new THREE.Mesh(geometry, material)
ground.rotateX(-Math.PI / 2)

export {
    ground
}
