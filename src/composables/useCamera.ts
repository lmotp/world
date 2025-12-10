import { PerspectiveCamera } from "three";

const useCamera = (aspect: number) => {
  const fov = 60;
  const near = 0.1;
  const far = 10000.0;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(10, 5, 5);

  return { camera };
};
export default useCamera;
