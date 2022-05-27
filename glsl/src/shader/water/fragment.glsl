precision lowp float;

uniform vec3 u_lowColor;
uniform vec3 u_highColor;
uniform float u_opacity;         // 透明度

varying float v_elevation;

void main() {
    float d_value = (v_elevation + 1.0) / 2.0;  // 由 -1到1  转换为 0到1
    vec3 color = mix(u_lowColor, u_highColor, d_value);

    gl_FragColor = vec4(color, u_opacity);
}
