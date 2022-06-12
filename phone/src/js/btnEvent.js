import * as THREE from 'three'
import phone from './phone.js'

const picPurple = require('@/texture/极光紫.png')
const picBlack = require('@/texture/幻夜黑.png')
const picRed = require('@/texture/珊瑚红.png')
const picBlue = require('@/texture/极光蓝.png')

const textureLoader = new THREE.TextureLoader()

const texturePurple = textureLoader.load(picPurple)
texturePurple.flipY = false
const textureBlack = textureLoader.load(picBlack)
textureBlack.flipY = false
const textureRed = textureLoader.load(picRed)
textureRed.flipY = false
const textureBlue = textureLoader.load(picBlue)
textureBlue.flipY = false

// var div = document.getElementById('color-wrapper')
// div.style.left = (window.innerWidth - 314) / 2 + 'px'

// 四个按钮对象
var btnPurple = document.getElementById('map1');
var btnBlack = document.getElementById('map2');
var btnRed = document.getElementById('map3');
var btnBlue = document.getElementById('map4');


btnPurple.addEventListener('click', function () {
    const [mesh] = phone.children
    mesh.material.map = texturePurple
}, false)
btnBlack.addEventListener('click', function () {
    const [mesh] = phone.children
    mesh.material.map = textureBlack
}, false)
btnRed.addEventListener('click', function () {
    const [mesh] = phone.children
    mesh.material.map = textureRed
}, false)
btnBlue.addEventListener('click', function () {
    const [mesh] = phone.children
    mesh.material.map = textureBlue
}, false)

