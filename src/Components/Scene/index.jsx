import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

import "./index.css";

/* PLANET MODELS */
import MARS from "../../Assets/Models/Planets/Mars.glb";
import MERCURY from "../../Assets/Models/Planets/Mercury.glb";

const Planet = ({ source, xPos, yPos, zPos }) => {
  const obj = useGLTF(source);

  return (
    <mesh scale={1} position={[xPos, yPos, zPos]}>
      <primitive object={obj.scene} />
    </mesh>
  );
};

const MouseMoveLogic = () => {
  const cameraRef = useRef();

  useFrame(({ camera }) => {
    if (cameraRef.current) {
      const mouseX = camera.position.x * 0.0009;
      const mouseY = camera.position.y * 0.0009;

      camera.position.x += mouseX;
      camera.position.y += mouseY;

      camera.lookAt(0, 0, 0);
      camera.updateMatrixWorld();
    }
  });

  return null;
};

const Scene = () => {
  return (
    <div id="space-canvas">
      <Suspense fallback={null}>
        <Canvas
          frameloop="always"
          camera={{ fov: 75, near: 0.1, far: 100000, position: [0, 0, 5] }}
        >
          <ambientLight intensity={1} />
          {/* <Environment preset="sunset" /> */}
          <MouseMoveLogic />
          <Planet source={MARS} xPos={0} yPos={0} zPos={0} />
          <Planet source={MERCURY} xPos={-2} yPos={0} zPos={0} />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Scene;