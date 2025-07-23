precision highp float;
varying vec3 vPosition;
uniform float time;
uniform float density;

void main () {
    vec3 grid = fract(vPosition * 1.5) - 0.5;
    float circle = step(0.4, length(grid));
    vec3 fragColor = mix(vec3(0.2392, 0.0353, 0.302), vec3(0.9216, 0.0471, 0.6588), circle);
    csm_DiffuseColor.rgb = vec3(fragColor);
}