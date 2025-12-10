varying vec2 vUv;

uniform float uTime;
uniform vec2 uResolution;

void main() {
  vec2 uv = vUv;
  vec4 color = vec4(uv, 1.0, 1.0);

  gl_FragColor = color;
}
