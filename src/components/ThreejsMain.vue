<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import testFragment from "@/shader/testFragment.glsl";
import testVertex from "@/shader/testVertex.glsl";

const threeRef = ref(null);

const clock = new THREE.Clock();
const width = window.innerWidth;
const height = window.innerHeight;
const dpi = Math.min(window.devicePixelRatio, 2);
const aspect = width / height;
const resolution = new THREE.Vector2(width * dpi, height * dpi);

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let controls: OrbitControls;

let material: THREE.ShaderMaterial | null = null;
let cube: THREE.Mesh<THREE.BoxGeometry, THREE.ShaderMaterial>;

const init = () => {
  if (!threeRef.value) return;

  renderer = new THREE.WebGLRenderer({ canvas: threeRef.value, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(dpi);
  renderer.setAnimationLoop(animate);

  camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
  camera.position.set(0, 0, 5);

  scene = new THREE.Scene();

  controls = new OrbitControls(camera, renderer.domElement);

  setupModel();
};

const setupModel = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: resolution },
    },
    vertexShader: testVertex,
    fragmentShader: testFragment,
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
};

const animate = () => {
  const time = clock.getDelta();

  controls.update();

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  if (material) material.uniforms.uTime!.value = time;

  renderer.render(scene, camera);
};

onMounted(() => {
  nextTick(init);
});
</script>

<template>
  <canvas ref="threeRef" />
</template>

<style scoped></style>
