import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js'
import group from './phone.js'
import {
    directionalLight_1,
    directionalLightHelper_1,
    directionalLight_2,
    directionalLightHelper_2,
    ambientLight,
} from './light.js'

const gui = new GUI()

// 导出参数
const params = {
    rotateY: false
}

// 旋转
gui.add(params, 'rotateY')

// 材质
const material = {
    envMapIntensity: 0.9
}
const materialFolder = gui.addFolder( 'Material' )
materialFolder.add(material, 'envMapIntensity', 0.0, 1.0).onChange(value => {
    const [phone] = group.children
    phone.material.envMapIntensity = value
})

// 环境光
const ambientLightParams = {
    intensity: 2.2
}
const AmbientLightFolder = gui.addFolder('AmbientLight')
AmbientLightFolder.add(ambientLightParams, 'intensity', 0.0, 5.0).onChange(value => {
    ambientLight.intensity = value
})

// 平行光1
const directionalLightParams_1 = {
    intensity: 0.8,
    x: 100,
    y: 50,
    z: 75,
}
const directionalLightFolder_1 = gui.addFolder('DirectionalLight-1')
directionalLightFolder_1.add(directionalLightParams_1, 'intensity', 0.0, 5.0).onChange(value => {
    directionalLight_1.intensity = value
})
directionalLightFolder_1.add(directionalLightParams_1, 'x', -100, 100).onChange(value => {
    directionalLight_1.position.x = value
    directionalLightHelper_1.update()
})
directionalLightFolder_1.add(directionalLightParams_1, 'y', -100, 100).onChange(value => {
    directionalLight_1.position.y = value
    directionalLightHelper_1.update()
})
directionalLightFolder_1.add(directionalLightParams_1, 'z', -100, 100).onChange(value => {
    directionalLight_1.position.z = value
    directionalLightHelper_1.update()
})

// 平行光2
const directionalLightParams_2 = {
    intensity: 0.8,
    x: 100,
    y: 50,
    z: 75,
}
const directionalLightFolder_2 = gui.addFolder('DirectionalLight-2')
directionalLightFolder_2.add(directionalLightParams_2, 'intensity', 0.0, 5.0).onChange(value => {
    directionalLight_2.intensity = value
})
directionalLightFolder_2.add(directionalLightParams_2, 'x', -100, 100).onChange(value => {
    directionalLight_2.position.x = value
    directionalLightHelper_2.update()
})
directionalLightFolder_2.add(directionalLightParams_2, 'y', -100, 100).onChange(value => {
    directionalLight_2.position.y = value
    directionalLightHelper_2.update()
})
directionalLightFolder_2.add(directionalLightParams_2, 'z', -100, 100).onChange(value => {
    directionalLight_2.position.z = value
    directionalLightHelper_2.update()
})


export default params
