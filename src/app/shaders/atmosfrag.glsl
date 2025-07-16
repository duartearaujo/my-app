varying vec3 vertNormal;
uniform mat4 modelViewMatrix;
uniform vec3 cameraPosition;

void main() {
    vec3 cameraViewPosition = normalize(mat3(modelViewMatrix) * cameraPosition);
    float intensity = pow(0.6 - dot(vertNormal, cameraViewPosition), 2.0);
    gl_FragColor = vec4(0.9412, 0.302, 1.0, 1.0) * intensity;
}