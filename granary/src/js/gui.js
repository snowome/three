import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js'
import {carGroup} from './model.js'


const gui = new GUI()

// 外壳油漆
const carbodyPaint = {
    clearcoat: 1.0,             // 透明涂层的强度
    clearcoatRoughness: 0.10,   // 透明涂层的粗糙度
    metalness: 0.9,
    roughness: 0.7,
    envMapIntensity: 1.8,
}
const carBodyPaintFolder = gui.addFolder('外壳油漆')
carBodyPaintFolder.add(carbodyPaint, 'clearcoat', 0.0, 1.0).onChange(value => {
    setMaterial('外壳', 'clearcoat', value)
})
carBodyPaintFolder.add(carbodyPaint, 'clearcoatRoughness', 0.0, 1.0).onChange(value => {
    setMaterial('外壳', 'clearcoatRoughness', value)
})
carBodyPaintFolder.add(carbodyPaint, 'metalness', 0.0, 1.0).onChange(value => {
    setMaterial('外壳', 'metalness', value)
})
carBodyPaintFolder.add(carbodyPaint, 'roughness', 0.0, 1.0).onChange(value => {
    setMaterial('外壳', 'roughness', value)
})
carBodyPaintFolder.add(carbodyPaint, 'envMapIntensity', 0.0, 5.0).onChange(value => {
    setMaterial('外壳', 'envMapIntensity', value)
})

// 玻璃
const glassMaterial = {
    transmission: 1.0,
    thickness: 2,
}
const glassMaterialFolder = gui.addFolder('玻璃')
glassMaterialFolder.add(glassMaterial, 'transmission', 0.0, 1.0).onChange(value => {
    setMaterial('玻璃', 'transmission', value)
})
glassMaterialFolder.add(glassMaterial, 'thickness', 0.0, 5.0).onChange(value => {
    setMaterial('玻璃', 'thickness', value)
})

// 轮胎
const tyreMaterail = {
    roughness: 0.6
}
const tyreMaterialFolder = gui.addFolder('轮胎')
tyreMaterialFolder.add(tyreMaterail, 'roughness', 0.0, 1.0).onChange(value => {
    setMaterial('轮胎', 'roughness', value)
})

// 当GUI界面发生变化，修改mesh的材质属性
function setMaterial(meshName, materialProp, value) {
    carGroup.traverse(function (model) {
        if (model.type === 'Mesh') {
            if (model.name.slice(0, meshName.length) == meshName) {
                model.material[materialProp] = value;
            }
        }
    })
}
