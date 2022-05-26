precision lowp float;

varying vec4 v_position;
varying vec3 g_position;

void main(){
    vec4 redColor = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 yelloColor = vec4(1.0, 1.0, 0.5, 1.0);
    vec4 mixColor = mix(redColor, yelloColor, g_position.y / 3.0);

    // 正面
    if (gl_FrontFacing) {
        gl_FragColor = vec4(mixColor.xyz - (v_position.y - 25.0) / 60.0 - 0.1, 1.0);
    }
    // 背面
    else {
        gl_FragColor = vec4(mixColor.xyz, 1.0);
    }
}
