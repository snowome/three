import * as THREE from 'three'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'

const R = 60
const StartAngle = Math.PI / 2 + Math.PI / 6
const EndAngle = Math.PI / 2 - Math.PI / 6

const geometry = new THREE.BufferGeometry()
const arc = new THREE.ArcCurve(0, 0, R, StartAngle, EndAngle )
const points = arc.getPoints(50)
geometry.setFromPoints(points)

const material = new THREE.LineBasicMaterial({
    color: 0xffffff
})
const line = new THREE.Line(geometry, material)
line.rotateX(Math.PI / 2)

const arc360 = new THREE.Group()
arc360.add(line)
arc360.position.y -= 85

const fontLoader = new FontLoader()

const fontFile = process.env.NODE_ENV === 'development'
    ? '../../_assets/helvetiker_bold.typeface.json'
    : './_assets/helvetiker_bold.typeface.json'
fontLoader.load(fontFile, function (font) {
    var material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    // var Shapes = font.generateShapes('360°', 10);//10)控制字符大小
    var Shapes = font.generateShapes('HUAWEI', 5);//10)控制字符大小
    var geometry = new THREE.ShapeGeometry(Shapes);//通过多个多边形轮廓生成字体
    var textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.z = R;
    textMesh.position.x = -15;
    arc360.add(textMesh)
})

export default arc360
