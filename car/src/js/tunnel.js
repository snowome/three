import * as THREE from 'three'

const tunnelGroup = new THREE.Group()

// 创建隧道
const R = 550
const radiusTop = R * 1.01
const radiusBottom = R * 1.01
const height = R * 9
const radialSegments = 32
const heightSegments = 1
const openEnded = true

const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded)
const material = new THREE.MeshPhongMaterial({
    color: 0x222222,
    side: THREE.BackSide
})

const mesh = new THREE.Mesh(geometry, material)
tunnelGroup.add(mesh)

// 隧道圆柱面上设置一些装饰圆点
var sphereGeo = new THREE.CylinderGeometry(R, R, R * 8, radialSegments, heightSegments * 50, openEnded);
var pos = sphereGeo.attributes.position;
var cirGeo = new THREE.CircleGeometry(8, 15);
for (let i = 0; i < pos.count; i++) {
    var cirMaterial = new THREE.MeshLambertMaterial({
        color: 0xaaaa66,
        side: THREE.BackSide,
    }); //材质对象Material
    cirMaterial.color.r = Math.random() * 0.7 + 0.3;
    cirMaterial.color.g = cirMaterial.color.r;
    cirMaterial.color.b = cirMaterial.color.r;
    var x = pos.getX(i);
    var y = pos.getY(i);
    var z = pos.getZ(i);
    let V1 = new THREE.Vector3(0, 0, 1); //垂直屏幕的方向  z轴方向
    let V2 = new THREE.Vector3(x, 0, z).normalize(); //圆柱y设置为0
    let q = new THREE.Quaternion();
    q.setFromUnitVectors(V1, V2);
    let M = new THREE.Matrix4();
    M.makeRotationFromQuaternion(q);
    var planeMesh = new THREE.Mesh(cirGeo, cirMaterial); //网格模型对象Mesh
    planeMesh.applyMatrix4(M)
    planeMesh.position.set(x, y, z);
    tunnelGroup.add(planeMesh);
}

tunnelGroup.rotateZ(Math.PI / 2)
tunnelGroup.position.y -= 10

export {
    tunnelGroup
}
