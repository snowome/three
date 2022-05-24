precision lowp float;
// highp  -2^16 - 2^16
// mediump -2^10 - 2^10
// lowp -2^8 - 2^8

// 波浪的频率
uniform float uFrequency;
// 波浪的幅度
uniform float uScale;
// 获取时间
uniform float uTime;
varying vec2 vUv;
varying float vElevation;

void main(){
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    modelPosition.z = sin((modelPosition.x + uTime) * uFrequency) * uScale;
    modelPosition.z += sin((modelPosition.y + uTime)  * uFrequency) * uScale;
    vElevation = modelPosition.z;

    gl_Position = projectionMatrix * viewMatrix * modelPosition ;
}
