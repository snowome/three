import * as THREE from 'three'

const markImg = require('@/texture/光点.png')

const textureLoader = new THREE.TextureLoader()
const markTexture = textureLoader.load(markImg)
markTexture.encoding = THREE.sRGBEncoding

//精灵缩放倍数
const scale = 30

function createCarMark(carModel) {
    const markName = ['右前光标', '右后光标', '左前光标', '左后光标', '后备箱光标']
    const markArray = []
    markName.forEach(name => {
        const material = new THREE.SpriteMaterial({
            map: markTexture,
            transparent: true
        })
        const sprit = new THREE.Sprite(material)
        sprit.scale.set(scale, scale, 1)
        const markObj = carModel.getObjectByName(name)
        markObj.add(sprit)

        if (name === '右前光标' || name === '右后光标') {
            sprit.position.z -= sprit.scale.x / 2
        } else if (name === '左前光标' || name === '左后光标') {
            sprit.position.z += sprit.scale.x / 2
        } else if (name === '后备箱光标') {
            sprit.position.x += sprit.scale.x / 2
        }

        markArray.push(sprit)
    })

    let s = 0
    function waveAnimation() {
        s += 0.01
        markArray.forEach(mark => {
            if (s < 0.5) {
                mark.scale.x = scale * (1 + s)
                mark.scale.y = scale * (1 + s)
            } else if (s >= 0.5 < 1) {
                mark.scale.x = scale * (2 - s)
                mark.scale.y = scale * (2 - s)
            } else {
                s = 0
            }
        })
        requestAnimationFrame(waveAnimation)
    }
    waveAnimation()
}




export {
    createCarMark
}
