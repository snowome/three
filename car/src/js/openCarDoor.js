import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import {camera} from './camera.js'

const openWav = require('@/texture/open.wav')
const closeWav = require('@/texture/close.wav')

// 创建一个监听者
const audioListener = new THREE.AudioListener()
// 创建一个非位置音频对象  用来控制播放
const openSound = new THREE.Audio(audioListener)
const closeSound = new THREE.Audio(audioListener)
// 创建一个音频加载器对象
const audioLoader = new THREE.AudioLoader()
audioLoader.load(openWav, function (buffer) {
    openSound.setBuffer(buffer)
    openSound.setVolume(0.15)
})
audioLoader.load(closeWav, function (buffer) {
    closeSound.setBuffer(buffer)
    closeSound.setVolume(0.4)
})


function openCarDoor(carModel) {
    const markName = ['右前光标', '右后光标', '左前光标', '左后光标', '后备箱光标']
    const doorName = ['右前门', '右后门', '左前门', '左后门', '后备箱']
    const chooseArr = []

    markName.forEach((name, index) => {
        const markObj = carModel.getObjectByName(name).children[0]
        chooseArr.push(markObj)

        markObj.door = carModel.getObjectByName(doorName[index])
        markObj.door.state = 'close'

        const _door = markObj.door
        const _name = markObj.door.name
        if (_name === '右前门' || _name === '右后门') {
            _door.openTween = doorTween('y', 0, Math.PI / 3, _door, 'open')
            _door.closeTween = doorTween('y', Math.PI / 3, 0, _door, 'close')
        } else if (_name === '左前门' || _name === '左后门') {
            _door.openTween = doorTween('y', 0, -Math.PI / 3, _door, 'open')
            _door.closeTween = doorTween('y', -Math.PI / 3, 0, _door, 'close')
        } else if (_name === '后备箱') {
            _door.openTween = doorTween('z', 0, Math.PI / 3, _door, 'open')
            _door.closeTween = doorTween('z', Math.PI / 3, 0, _door, 'close')
        }

    })

    function choose(event) {
        const sx = event.clientX
        const sy = event.clientY

        const x = (sx / window.innerWidth) * 2 - 1
        const y = -(sy / window.innerHeight) * 2 + 1

        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
        const intersects = raycaster.intersectObjects(chooseArr)

        if (intersects.length) {
            const _door = intersects[0].object.door
            if (_door.state === 'close') {
                _door.state = 'open'
                _door.openTween.start()
            } else {
                _door.state = 'close'
                _door.closeTween.start()
            }
        }
    }

    window.addEventListener('click', choose)
}

function doorTween(axis, startAngle, endAngle, door, openOrClose) {
    const state = {
        angle: startAngle
    }
    const tween = new TWEEN.Tween(state)
    tween.to({angle: endAngle}, 800)
    tween.onUpdate(() => {
        door.rotation[axis] = state.angle
    })
    tween.easing(TWEEN.Easing.Quintic.InOut)

    if (openOrClose == 'open') {
        tween.onStart(function () {
            openSound.play()
        })
    } else {
        tween.onComplete(function () {
            closeSound.play()
        })
    }

    return tween
}

export {
    openCarDoor
}
