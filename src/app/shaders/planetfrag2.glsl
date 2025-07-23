precision highp float;
varying vec3 vPosition;
uniform float time;
uniform float density;

void main () {
    float frequency = 3.0;
    float amplitude = 0.6;
    float spacing = 0.5;
    float thickness = 0.5;

    float wave = sin(vPosition.x * frequency + vPosition.z) * amplitude;
    float line = step(0.5, mod(vPosition.y + wave, 1.0));
    vec3 fragColor = mix(vec3(0.0, 1.0, 0.6667), vec3(0.0118, 0.2196, 0.2471), line);
    csm_DiffuseColor.rgb = vec3(fragColor);
}