<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import useCamera from "@/composables/useCamera";
import useLight from "@/composables/useLight";
import useGrass from "@/composables/useGrass";

const threeRef = ref(null);

const width = window.innerWidth;
const height = window.innerHeight;
const dpi = Math.min(window.devicePixelRatio, 2);
const aspect = width / height;
const resolution = new THREE.Vector2(width * dpi, height * dpi);
const clock = new THREE.Clock();

const materials: any[] = [];

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let light: THREE.DirectionalLight;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;

const init = () => {
  if (!threeRef.value) return;

  renderer = new THREE.WebGLRenderer({ canvas: threeRef.value, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(dpi);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0.7, 0.8, 1.0);

  const cameraConfig = useCamera(aspect);
  camera = cameraConfig.camera;

  const lightConfig = useLight();
  light = lightConfig.light;
  scene.add(light);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();

  const { sky, skyMat, plane, groundMat, grass, grassMat } = useGrass(resolution);
  materials.push(groundMat, skyMat, grassMat);
  scene.add(plane, sky, grass);

  animate();
};

const animate = () => {
  requestAnimationFrame(animate);

  controls.update();

  if (materials.length) {
    materials.forEach((m) => {
      m.uniforms.time.value = clock.getElapsedTime();
    });
  }

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
