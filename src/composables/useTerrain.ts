import { MeshStandardMaterial, Mesh, Group, Color, PlaneGeometry } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import vshTerrainText from "@/shaders/water/terrain-vertex-shader.glsl";
import fshTerrainText from "@/shaders/water/terrain-fragment-shader.glsl";

import terrain from "@/assets/models/terrain.glb";

const useRock = async ({ waterLevel, waveSpeed, waveAmplitude, foamDepth }: any) => {
  const SAND_BASE_COLOR = "#ff9900";
  const GRASS_BASE_COLOR = "#85a02b";
  const UNDERWATER_BASE_COLOR = "#118a4f";
  const WATER_LEVEL = waterLevel;
  const WAVE_SPEED = waveSpeed;
  const WAVE_AMPLITUDE = waveAmplitude;
  const FOAM_DEPTH = foamDepth;
  const group = new Group();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  const model = await loader.loadAsync(terrain);
  const modelGeometry = (model.scene.children[0] as Mesh).geometry;
  const baseMaterial = new MeshStandardMaterial({ color: SAND_BASE_COLOR });
  const uniforms = {
    uTime: { value: 0 },
    uGrassColor: { value: new Color(GRASS_BASE_COLOR) },
    uUnderwaterColor: { value: new Color(UNDERWATER_BASE_COLOR) },
    uWaterLevel: { value: WATER_LEVEL },
    uWaveSpeed: { value: WAVE_SPEED },
    uFoamDepth: { value: FOAM_DEPTH },
    uWaveAmplitude: { value: WAVE_AMPLITUDE },
  };
  const material = new CustomShaderMaterial({
    baseMaterial,
    uniforms,
    vertexShader: vshTerrainText,
    fragmentShader: fshTerrainText,
  });

  const mesh = new Mesh(modelGeometry, material);
  group.add(mesh);

  const plane = new Mesh(new PlaneGeometry(256, 256), new MeshStandardMaterial({ color: UNDERWATER_BASE_COLOR }));
  plane.rotateX(-Math.PI / 2);
  plane.position.y = -0.01;
  plane.receiveShadow = true;
  group.add(plane);

  return { terrain: group, terrainMat: material };
};
export default useRock;
