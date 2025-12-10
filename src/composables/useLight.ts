import { DirectionalLight } from "three";

const useLight = () => {
  const light = new DirectionalLight(0xffffff, 1.0);
  light.position.set(1, 1, 1);
  light.lookAt(0, 0, 0);

  return { light };
};

export default useLight;
