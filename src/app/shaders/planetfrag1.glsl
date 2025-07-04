precision highp float;
varying vec3 vPosition;
uniform float time;
uniform float density;

#pragma glslify: noise = require(glsl-noise/simplex/4d);
#define PI 3.141592653589793

float patternZebra(float v){
    float d = 1.0 / density;
    float s = -cos(v / d * PI * 2.);
    return smoothstep(.0, .1 * d, .1 * s / fwidth(s));
}

void main () {
    float frequency = .5;
    float amplitude = 1.0;
    float v = noise(vec4(vPosition * frequency, sin(PI * .7))) * amplitude;
    float t = patternZebra(v);
    vec3 fragColor = mix(vec3(0.9216, 0.0471, 0.6588), vec3(0.2392, 0.0353, 0.302), t);
    csm_FragColor = vec4(fragColor, 1.);
    csm_DiffuseColor.rgb = vec3(fragColor);
}