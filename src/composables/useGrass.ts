import {
  TextureLoader,
  RepeatWrapping,
  Vector2,
  ShaderMaterial,
  PlaneGeometry,
  Mesh,
  SphereGeometry,
  BackSide,
} from "three";

import vshSkyText from "@/shaders/grass/sky-vertex-shader.glsl";
import fshSkyText from "@/shaders/grass/sky-fragment-shader.glsl";
import vshGroundText from "@/shaders/grass/ground-vertex-shader.glsl";
import fshGroundText from "@/shaders/grass/ground-fragment-shader.glsl";

import grid from "@/assets/images/textures/grid.png";

const useGrass = (resolution: Vector2) => {
  const diffuseTexture = new TextureLoader().load(grid);
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
  plane.scale.setScalar(10);

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

  return {
    sky,
    skyMat,
    groundMat,
    plane,
  };
};

export default useGrass;
