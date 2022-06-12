/**
 * 直线拐角自动圆角化(圆弧转弯)
 * pointArr Vector3 点的数组
 * radius   Number  圆弧半径
 * scene    Object  传入则显示“相关向量可视化”
 * **/
function roundTrackVertices(pointArr, radius, scene) {
    var ret = [];
    for (var i = 1; i < pointArr.length - 1; i++) {
        // 三个点坐标
        var p1 = pointArr[i - 1];
        var p2 = pointArr[i];
        var p3 = pointArr[i + 1];
        // 计算三个点构成的两条线的方向
        var dir1 = p1.clone().sub(p2).normalize();
        var dir2 = p3.clone().sub(p2).normalize();
        // 相关向量可视化
        if (scene) {
            scene.add(new THREE.ArrowHelper(dir1, p2, 30, 0xffff00));
            scene.add(new THREE.ArrowHelper(dir2, p2, 30, 0xffff00));
        }
        // 两直线方向叉乘z坐标，得到一个垂直与他们的向量
        var crossZ = dir1.clone().cross(dir2).z;
        if (crossZ == 0) {
            // 两直线重合不用圆角化，直接插入交叉点p2坐标即可
            ret.push(p2);
        } else {
            // 角平分线
            var bisector = dir2.clone().add(dir1).normalize();
            if (scene) {
                scene.add(new THREE.ArrowHelper(bisector, p2, 50, 0x666666));
            }
            // 两条直线方向向量夹角余弦值
            var angleOfCos = dir1.clone().dot(dir2);
            // 夹角
            var angle = Math.acos(angleOfCos);
            // 圆心与两条直接(p1、p3)交叉点距离
            var centerToLine = radius / Math.sin(angle / 2);
            // 圆心坐标
            var center = p2.clone().add(bisector.clone().multiplyScalar(centerToLine));
            // 垂足与两直线交点距离(p2点和圆弧相交后的点，两点的距离)
            var p2Intersect = centerToLine * Math.cos(angle / 2);
            // 垂足1
            var dir1Point = p2.clone().add(dir1.clone().multiplyScalar(p2Intersect))
            // 垂足2
            var dir2Point = p2.clone().add(dir2.clone().multiplyScalar(p2Intersect))
            // dir1垂线（dir1交点即垂足到圆心）
            var CenterToDir1Point = dir1Point.clone().sub(center).normalize();
            // dir2垂线（dir2交点即垂足到圆心）
            var CenterToDir2Point = dir2Point.clone().sub(center).normalize();
            if (scene) {
                scene.add(new THREE.ArrowHelper(CenterToDir1Point, center, 30, 0xff0000));
                scene.add(new THREE.ArrowHelper(CenterToDir2Point, center, 30, 0xff0000));
            }
            var vectorX = new THREE.Vector3(1, 0, 0);
            // dir1垂线与x轴夹角
            var aStartAngle = Math.acos(CenterToDir1Point.clone().dot(vectorX));
            // dir2垂线与x轴夹角
            var aEndAngle = Math.acos(CenterToDir2Point.clone().dot(vectorX));
            if (CenterToDir1Point.y < 0) aStartAngle = 2 * Math.PI - aStartAngle
            if (CenterToDir2Point.y < 0) aEndAngle = 2 * Math.PI - aEndAngle
            // 圆弧线绘制
            var direction = false; //false逆时针  true顺时针
            if (crossZ > 0) direction = true;
            var curve = new THREE.ArcCurve(center.x, center.y, radius, aStartAngle, aEndAngle, direction);
            ret.push(...curve.getSpacedPoints(15))
        }
    }
    return [pointArr[0], ...ret, pointArr[pointArr.length -1]]
}
