uniform float uTime; // Unused, but can be used for animations

// Varyings
varying vec2 vUv;

mat2 rotate2d(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 st = vUv * rotate2d(3.1415 / 1.5); // Rotate the UV coordinates by 45 degrees

  float spacing = 0.05;
  float thickness = 0.01;

  // Wave offset based on horizontal position
  float frequency = 8.0;
  float amplitude = 0.03;
  float wave = sin(st.x * frequency + uTime*0.3) * amplitude;

  // Apply wave to Y axis
  float line = smoothstep(mod(st.y + wave, spacing), thickness + mod(st.y + wave, spacing), thickness);

  vec3 color = vec3(line); // white lines on black
  gl_FragColor = vec4(color, 1.0);
}