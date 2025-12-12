import { MeshStandardMaterial, PlaneGeometry, Mesh, Color } from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import vshWaterText from "@/shaders/water/water-vertex-shader.glsl";
import fshWaterText from "@/shaders/water/water-fragment-shader.glsl";

const useWater = ({ waterLevel, waveSpeed, waveAmplitude }: any) => {
  const COLOR_BASE_NEAR = "#00fccd";
  const COLOR_FAR = "#1ceeff";
  const WATER_LEVEL = waterLevel;
  const WAVE_SPEED = waveSpeed;
  const WAVE_AMPLITUDE = waveAmplitude;
  const TEXTURE_SIZE = 45;

  const geometry = new PlaneGeometry(256, 256);
  const baseMaterial = new MeshStandardMaterial({
    color: COLOR_BASE_NEAR,
    metalness: 0.8,
    roughness: 0.2,
  });
  const uniforms = {
    uTime: { value: 0 },
    uColorFar: { value: new Color(COLOR_FAR) },
    uWaveSpeed: { value: WAVE_SPEED },
    uWaveAmplitude: { value: WAVE_AMPLITUDE },
    uTextureSize: { value: TEXTURE_SIZE },
  };
  const material = new CustomShaderMaterial({
    baseMaterial,
    uniforms,
    vertexShader: vshWaterText,
    fragmentShader: fshWaterText,
    transparent: true,
  });

  const plane = new Mesh(geometry, material);
  plane.position.y = WATER_LEVEL;
  plane.rotateX(-Math.PI / 2);
  plane.receiveShadow = true;

  return { water: plane, waterMat: material };
};

export default useWater;
