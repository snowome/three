precision lowp float;
// highp  -2^16 - 2^16
// mediump -2^10 - 2^10
// lowp -2^8 - 2^8

varying vec2 v_uv;

void main(){
    v_uv = uv;

    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    gl_Position = projectionMatrix * viewMatrix * modelPosition ;
}
