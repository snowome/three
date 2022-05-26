precision lowp float;

varying vec4 v_position;
varying vec3 g_position;

void main(){
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );
    v_position = modelPosition;
    g_position = position;

    gl_Position = projectionMatrix * viewMatrix * modelPosition ;
}
