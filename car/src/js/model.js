import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {setCarMaterial} from './setCarMaterial.js'
import {createCarMark} from './createCarMark.js'
import {openCarDoor} from './openCarDoor.js'
import {lensflare1, lensflare2} from './carLight.js'

const carGltf = require('@/texture/轿车.glb')

const gltfLoader = new GLTFLoader()

const carGroup = new THREE.Group()
gltfLoader.loadAsync(carGltf).then(gltf => {
    const car = setCarMaterial(gltf.scene.clone())

    createCarMark(car)
    openCarDoor(car)

    const light1 = car.getObjectByName('镜头光晕1')
    light1.add(lensflare1)
    const light2 = car.getObjectByName('镜头光晕2')
    light2.add(lensflare2)

    carGroup.add(car)
}).catch()

export {carGroup}
