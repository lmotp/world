import { DirectionalLight, AmbientLight } from "three";

const useLight = () => {
  const light = new DirectionalLight(0xffffff, 1.0);
  light.position.set(1, 1, 1);
  light.lookAt(0, 0, 0);

  const secondLight = new DirectionalLight(0xffffff, 2.5);
  secondLight.position.set(13, 5, 5);
  secondLight.castShadow = true;
  secondLight.shadow.mapSize.set(1024, 1024);

  const ambientLight = new AmbientLight(0xffffff, 0.5);

  return { light, secondLight, ambientLight };
};

export default useLight;
