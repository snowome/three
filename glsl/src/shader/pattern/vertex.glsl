precision lowp float;
// highp  -2^16 - 2^16
// mediump -2^10 - 2^10
// lowp -2^8 - 2^8

// 获取时间
uniform float uTime;
varying vec2 vUv;
varying float vElevation;

void main(){
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    modelPosition.z = sin((modelPosition.x + uTime) * 10.0) * 0.05 ;
    modelPosition.z += sin((modelPosition.y + uTime)  * 10.0) * 0.05 ;
    vElevation = modelPosition.z;

    gl_Position = projectionMatrix * viewMatrix * modelPosition ;
}
