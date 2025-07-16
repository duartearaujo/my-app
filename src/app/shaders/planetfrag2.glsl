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
    float v = noise(vec4(vPosition * frequency, sin(PI * .9))) * amplitude;
    float t = patternZebra(v);
    vec3 fragColor = mix(vec3(0.0, 1.0, 0.6667), vec3(0.0118, 0.2196, 0.2471), t);
    csm_DiffuseColor.rgb = vec3(fragColor);
}