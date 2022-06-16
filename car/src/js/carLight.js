import * as THREE from 'three'
import {Lensflare, LensflareElement} from 'three/examples/jsm/objects/lensflare'
import {carGroup} from './model.js'

const lensflareImg = require('@/texture/lensflare.jpg')

const textureLoader = new THREE.TextureLoader()

const texture = textureLoader.load(lensflareImg)

const lensflareEle = new LensflareElement(texture, 600, 0, new THREE.Color(0xffffff))

const lensflare1 = new Lensflare()
lensflare1.addElement(lensflareEle)
lensflare1.visible = false

const lensflare2 = new Lensflare()
lensflare2.addElement(lensflareEle)
lensflare2.visible = false

function openCarLight() {
    lensflare1.visible = true
    lensflare2.visible = true
}

function closeCarLight() {
    lensflare1.visible = false
    lensflare2.visible = false
}

export {
    lensflare1,
    lensflare2,
    openCarLight,
    closeCarLight
}

