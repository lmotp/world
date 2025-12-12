varying vec2 csm_vUv;

uniform float uTime;
uniform float uWaveSpeed;
uniform float uWaveAmplitude;

void main() {

  csm_vUv = uv;

  float sineOffset = sin(uTime * uWaveSpeed) * uWaveAmplitude;
  vec3 modifiedPosition = position;
  modifiedPosition.z += sineOffset;

  csm_Position = modifiedPosition;

}