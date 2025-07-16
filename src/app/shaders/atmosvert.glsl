varying vec3 vPosition;
varying vec3 vertNormal;

void main () {
    vPosition = position;
    vertNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}