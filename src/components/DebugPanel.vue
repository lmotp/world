<script setup lang="ts">
import { Pane } from "tweakpane";

const pane = new Pane();
const PARAMS = {
  factor: 123,
  title: "hello",
  color: "#ff0055",
};

pane.addBinding(PARAMS, "factor");
pane.addBinding(PARAMS, "title");
pane.addBinding(PARAMS, "color");
</script>

<template></template>

<style scoped></style>
