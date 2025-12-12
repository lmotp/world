import { MeshStandardMaterial, Mesh, Group, Color } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import vshRockText from "@/shaders/water/rock-vertex-shader.glsl";
import fshRockText from "@/shaders/water/rock-fragment-shader.glsl";

import rock from "@/assets/models/rocks.glb";

const useRock = async ({ waterLevel, waveSpeed, waveAmplitude, foamDepth }: any) => {
  const ROCK_BASE_COLOR = "#b2baa0";
  const MOSS_BASE_COLOR = "#8aa72d";
  const WATER_LEVEL = waterLevel;
  const WAVE_SPEED = waveSpeed;
  const WAVE_AMPLITUDE = waveAmplitude;
  const FOAM_DEPTH = foamDepth;
  const group = new Group();
  group.position.set(8, 0.5, -5);
  group.rotateY(Math.PI * 0.5);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  const model = await loader.loadAsync(rock);
  const modelGeometry = (model.scene.children[0] as Mesh).geometry;
  const baseMaterial = new MeshStandardMaterial({ color: ROCK_BASE_COLOR });
  const uniforms = {
    uTime: { value: 0 },
    uMossColor: { value: new Color(MOSS_BASE_COLOR) },
    uWaterLevel: { value: WATER_LEVEL },
    uWaveSpeed: { value: WAVE_SPEED },
    uFoamDepth: { value: FOAM_DEPTH },
    uWaveAmplitude: { value: WAVE_AMPLITUDE },
  };
  const material = new CustomShaderMaterial({
    baseMaterial,
    uniforms,
    vertexShader: vshRockText,
    fragmentShader: fshRockText,
  });

  const mesh = new Mesh(modelGeometry, material);
  mesh.castShadow = true;
  group.add(mesh);

  return { rock: group, rockMat: material };
};
export default useRock;
