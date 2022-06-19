import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
const granaryGltf = require('@/texture/modelZH.glb')
import {createFlame} from './flame.js'
const gltfLoader = new GLTFLoader()

const granaryGroup = new THREE.Group()
const granaryList = []
gltfLoader.loadAsync(granaryGltf).then(gltf => {
    const model = gltf.scene
    model.traverse(model => {
        if (model.type === 'Mesh') {
            model.material = new THREE.MeshLambertMaterial({
                map: model.material.map,
                color: model.material.color
            })
        }
    })

    const granaryModel = model.getObjectByName('粮仓')

    // granaryGroup.add(aaa)
    function granaryFlame(name) {
        const granary = model.getObjectByName(name)
        const pos = new THREE.Vector3()
        granary.getWorldPosition(pos)

        const flame = createFlame()
        flame.position.copy(pos)
        if (granary.parent.name === '立筒仓') {
            flame.position.y += 36
        } else if (granary.parent.name === '浅圆仓') {
            flame.position.y += 20
        } else if (granary.parent.name === '平房仓') {
            flame.position.y += 17
        }
        flame.position.y += -4
        flame.addMark(`粮仓 ${name} 失火了 ！！！`)

        return flame
    }

    const P_05_flame = granaryFlame('P_05')
    granaryGroup.add(P_05_flame)

    setTimeout(function () {
        P_05_flame.stop()
        P_05_flame.remove(P_05_flame.mark)
        granaryGroup.remove(P_05_flame)
    }, 3000)
    setTimeout(function () {
        const Q_05_frame = granaryFlame('Q_05')
        granaryGroup.add(Q_05_frame)
    }, 1000)

    granaryModel.traverse(model => {
        if (model.type === 'Mesh') {
            granaryList.push(model)
        }
    })

    granaryGroup.add(model)
}).catch()

export {granaryGroup, granaryList}
