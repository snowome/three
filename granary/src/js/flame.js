import * as THREE from 'three'
import { CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

const flameImg = require('@/texture/火焰.png')

const textureLoader = new THREE.TextureLoader()

const flameTexture = textureLoader.load(flameImg)
flameTexture.encoding = THREE.sRGBEncoding

const num = 15      //火焰多少帧图
flameTexture.repeat.set(1 / num, 1)

const w = 25
const h = 1.6 * w

function createFlame() {
    const geometry = new THREE.PlaneBufferGeometry(w, h)
    geometry.translate(0, h / 2, 0)
    const material = new THREE.MeshBasicMaterial({
        map: flameTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
    })
    const group = new THREE.Group()
    const mesh = new THREE.Mesh(geometry, material)
    const mesh90 = mesh.clone().rotateY(Math.PI / 2)
    const mesh45 = mesh.clone().rotateY(Math.PI / 4)
    const mesh135 = mesh.clone().rotateY(Math.PI / 4 * 3)
    group.add(mesh, mesh90, mesh45, mesh135)

    let animationFrame = null
    let t = 0
    function animation() {
        t += 0.1
        if (t > num) {
            t = 0
        }
        flameTexture.offset.x = Math.floor(t) / num
        animationFrame = requestAnimationFrame(animation)
    }
    animation()

    group.stop = function () {
        cancelAnimationFrame(animationFrame)
    }
    group.addMark = function (name) {
        const message = mark(name)
        group.mark = message
        group.add(message)

    }
    return group
}

function mark(name) {
    const div = document.createElement('div')
    div.innerHTML = name
    div.classList.add('mark')
    div.style.pointerEvents = 'none'
    const label = new CSS3DSprite(div)
    label.scale.set(0.22, 0.22, 1)
    label.position.y += h
    return label
}

export {
    createFlame
}
