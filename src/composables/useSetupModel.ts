import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import model from "@/assets/models/forest_house.glb";

const useSetupModel = (renderer: any, camera: any, scene: any) => {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  loader.load(model, async (gltf) => {
    const model = gltf.scene;
    model.scale.setScalar(2.5);
    model.position.y = 2.0;

    await renderer.compileAsync(model, camera, scene);

    scene.add(model);
  });
};

export default useSetupModel;
