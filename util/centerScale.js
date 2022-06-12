// 控制正投影相机居中，全屏渲染模型
function centerScaleOfOrthographicCamera(camera, group) {
    // 包围盒计算模型对象的大小和位置
    var box3 = new THREE.Box3();
    box3.expandByObject(group); // 计算模型包围盒
    var size = new THREE.Vector3();
    box3.getSize(size); // 计算包围盒尺寸
    var center = new THREE.Vector3();
    box3.getCenter(center); // 计算一个层级模型对应包围盒的几何体中心坐标


    // 计算包围盒的最大边长
    function maxSize(vec3) {
        var max;
        if (vec3.x > vec3.y) {
            max = vec3.x
        } else {
            max = vec3.y
        }
        if (max > vec3.z) {} else {
            max = vec3.z
        }
        return max;
    }

    var max = maxSize(size); //包围盒长宽高中最大的一个值，用来表征模型的尺寸
    // 1.相机位于模型包围盒之外  算法：模型世界坐标三个分量分别+1.5倍max
    camera.position.copy(center.clone().addScalar(max * 1.5));
    // 2. 居中渲染：设置相机目标观察点，指向包围盒几何中心
    camera.lookAt(center);
    // 3.全屏渲染：渲染范围和模型尺寸相近 模型尺寸用长宽高其中最大值表征
    s = max / 2; //如果全屏渲染s是max 2倍左右
    camera.left = -s * k;
    camera.right = s * k;
    camera.top = s;
    camera.bottom = -s;
    camera.near = max * 0.1; //最好和相机位置或者说包围盒关联，别设置0.1 1之类看似小的值
    camera.far = max * 4; //根据相机位置和包围大小设置，把包围盒包含进去即可，宁可把偏大，不可偏小
    camera.updateProjectionMatrix(); //渲染范围改变，注意更新投影矩阵

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // 如果使用了相机控件，与上面lookAt代码冲突，注意设置.target属性
    controls.target.copy(center);
    controls.update(); //update()函数内会执行camera.lookAt(controls.target)
}

// 控制透视投影相机居中，全屏渲染模型
function centerScaleOfPerspectiveCamera(camera, group) {
    // 包围盒计算模型对象的大小和位置
    var box3 = new THREE.Box3();
    box3.expandByObject(group); // 计算模型包围盒
    var size = new THREE.Vector3();
    box3.getSize(size); // 计算包围盒尺寸
    var center = new THREE.Vector3();
    box3.getCenter(center); // 计算一个层级模型对应包围盒的几何体中心坐标

    // 计算包围盒的最大边长
    function maxSize(vec3) {
        var max;
        if (vec3.x > vec3.y) {
            max = vec3.x
        } else {
            max = vec3.y
        }
        if (max > vec3.z) {} else {
            max = vec3.z
        }
        return max;
    }

    var max = maxSize(size); //包围盒长宽高中最大的一个值，用来表征模型的尺寸
    // 1.控制渲染范围，但是不要忘记相机位于模型包围盒之外
    // fov — 摄像机视锥体垂直视野角度应该设置为60，和这里的0.5搭配
    camera.position.copy(center.clone().addScalar(max * 0.5));
    // 2. 居中渲染：设置相机目标观察点，指向包围盒几何中心
    camera.lookAt(center);
    // 3.注意near和far尺寸控制
    camera.near = max * 0.1;//最好和相机位置或者说包围盒关联，别设置0.1 1之类看似小的值
    camera.far = max * 3;//根据相机位置和包围大小设置，把包围盒包含进去即可，宁可把偏大，不可偏小
    camera.updateProjectionMatrix();//渲染范围改变，注意更新投影矩阵

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // 如果使用了相机控件，与上面lookAt代码冲突，注意设置.target属性
    controls.target.copy(center);
    controls.update(); //update()函数内会执行camera.lookAt(controls.target)
}

