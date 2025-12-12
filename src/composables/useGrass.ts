import {
  TextureLoader,
  RepeatWrapping,
  Vector2,
  ShaderMaterial,
  PlaneGeometry,
  Mesh,
  SphereGeometry,
  BackSide,
  InstancedBufferGeometry,
  Sphere,
  Vector3,
  Vector4,
  FrontSide,
} from "three";

import TextureAtlas from "@/composables/useTextureAtlas";

import vshSkyText from "@/shaders/grass/sky-vertex-shader.glsl";
import fshSkyText from "@/shaders/grass/sky-fragment-shader.glsl";
import vshGroundText from "@/shaders/grass/ground-vertex-shader.glsl";
import fshGroundText from "@/shaders/grass/ground-fragment-shader.glsl";
import vshGrassText from "@/shaders/grass/grass-vertex-shader.glsl";
import fshGrassText from "@/shaders/grass/grass-fragment-shader.glsl";

import grid from "@/assets/images/textures/grid.png";
import ground from "@/assets/images/textures/ground.webp";
import tileData from "@/assets/images/textures/tileData.jpg";
import grass1 from "@/assets/images/textures/grass1.png";
import grass2 from "@/assets/images/textures/grass2.png";

const NUM_GRASS = 64 * 1024;
const GRASS_SEGMENTS = 6;
const GRASS_PATCH_SIZE = 25;
const GRASS_WIDTH = 0.25;
const GRASS_HEIGHT = 1.5;

const useGrass = (resolution: Vector2) => {
  const diffuseTexture = new TextureLoader().load(ground);
  diffuseTexture.wrapS = RepeatWrapping;
  diffuseTexture.wrapT = RepeatWrapping;

  // Make ground
  const groundMat = new ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      resolution: { value: resolution },
      diffuseTexture: { value: diffuseTexture },
    },
    vertexShader: vshGroundText,
    fragmentShader: fshGroundText,
  });

  const geometry = new PlaneGeometry(1, 1, 512, 512);
  const plane = new Mesh(geometry, groundMat);
  plane.rotateX(-Math.PI / 2);
  plane.scale.setScalar(50);

  // Make sky
  const skyGeo = new SphereGeometry(5000, 32, 15);
  const skyMat = new ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      resolution: { value: resolution },
    },
    vertexShader: vshSkyText,
    fragmentShader: fshSkyText,
    side: BackSide,
  });

  const sky = new Mesh(skyGeo, skyMat);
  sky.castShadow = false;
  sky.receiveShadow = false;

  // Grass
  const tileDataTexture = new TextureLoader().load(tileData);
  const uniforms = {
    grassParams: { value: new Vector4(GRASS_SEGMENTS, GRASS_PATCH_SIZE, GRASS_WIDTH, GRASS_HEIGHT) },
    time: { value: 0 },
    grassDiffuse: { value: null },
    resolution: { value: resolution },
    tileDataTexture: { value: tileDataTexture },
  };

  const diffuse = new TextureAtlas();
  diffuse.Load("diffuse", [grass1, grass2]);
  diffuse.onLoad = () => {
    uniforms.grassDiffuse.value = diffuse.Info["diffuse"].atlas;
  };

  const grassMaterial = new ShaderMaterial({
    uniforms,
    vertexShader: vshGrassText,
    fragmentShader: fshGrassText,
    side: FrontSide,
  });
  const grassGeometry = createGeometry(GRASS_SEGMENTS);
  const grass = new Mesh(grassGeometry, grassMaterial);
  grass.position.set(0, 0, 0);

  return {
    sky,
    skyMat,
    plane,
    groundMat,
    grass,
    grassMat: grassMaterial,
  };
};

const createGeometry = (segments: number) => {
  const VERTICES = (segments + 1) * 2;
  const indices = [];

  for (let i = 0; i < segments; ++i) {
    const vi = i * 2;
    indices[i * 12 + 0] = vi + 0;
    indices[i * 12 + 1] = vi + 1;
    indices[i * 12 + 2] = vi + 2;

    indices[i * 12 + 3] = vi + 2;
    indices[i * 12 + 4] = vi + 1;
    indices[i * 12 + 5] = vi + 3;

    const fi = VERTICES + vi;
    indices[i * 12 + 6] = fi + 2;
    indices[i * 12 + 7] = fi + 1;
    indices[i * 12 + 8] = fi + 0;

    indices[i * 12 + 9] = fi + 3;
    indices[i * 12 + 10] = fi + 1;
    indices[i * 12 + 11] = fi + 2;
  }

  const geo = new InstancedBufferGeometry();
  geo.instanceCount = NUM_GRASS;
  geo.setIndex(indices);
  geo.boundingSphere = new Sphere(new Vector3(0, 0, 0), 1 + GRASS_PATCH_SIZE * 2);

  return geo;
};

export default useGrass;
