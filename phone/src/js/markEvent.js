import * as THREE from 'three'
import camera from './camera.js'
import phoneGroup from './phone.js'
import {css2Render} from './renderer.js'

function choose(event) {
    const target = event.target || event.srcElement
    if (target && target.getAttribute('id') === 'camera-tag__close') {
        css2Render.domElement.style.display = 'none'
        return false
    }

    const sx = event.clientX
    const sy = event.clientY

    const x = (sx / window.innerWidth) * 2 - 1
    const y = -(sy / window.innerHeight) * 2 + 1

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
    const mark = phoneGroup.getObjectByName('手机标注')

    const intersects = raycaster.intersectObjects([mark])

    if (intersects.length > 0) {
        const state = css2Render.domElement.style.display
        if (state === 'block') {
            css2Render.domElement.style.display = 'none'
        } else {
            css2Render.domElement.style.display = 'block'
        }
    }
}

document.body.addEventListener('click', choose)

export { choose }
