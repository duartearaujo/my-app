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
    float v = noise(vec4(vPosition * frequency, sin(PI * .6))) * amplitude;
    float t = patternZebra(v);
    vec3 fragColor = mix(vec3(1.0, 0.3686, 0.0), vec3(0.2275, 0.102, 0.0), t);
    csm_FragColor = vec4(fragColor, 1.);
    csm_DiffuseColor.rgb = vec3(fragColor);
}