varying vec3 vPosition;

void main () {
    vPosition = position;
    csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}