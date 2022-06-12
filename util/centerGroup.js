// 模型位置自动居中
function centerGroup(group) {
    // 包围盒计算模型对象的大小和位置
    var box3 = new THREE.Box3();
    box3.expandByObject(group); // 计算模型包围盒
    var center = new THREE.Vector3();
    box3.getCenter(center); // 计算一个层级模型对应包围盒的几何中心坐标
    //重新设置模型的位置
    group.position.x -=  center.x;
    group.position.y -=  center.y;
    group.position.z -=  center.z;
}
