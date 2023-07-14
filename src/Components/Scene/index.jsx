import { Suspense, useContext, useRef } from "react";
import { StateContext } from "../../StateContext";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Bloom, Noise, EffectComposer, DepthOfField, DotScreen, Scanline } from '@react-three/postprocessing'
import { Environment, useGLTF, PointerLockControls } from "@react-three/drei";
import { Stars } from "@react-three/drei";
import { TextureLoader, DoubleSide } from "three";

import "./index.css";

/* PLANET MODELS */
import MARS from "../../Assets/Models/Planets/Mars.glb";
import MERCURY from "../../Assets/Models/Planets/Mercury.glb";
import MOON from "../../Assets/Models/Planets/Moon.glb";
import MOON_COLOR from "../../Assets/Models/Planets/MoonColorWithNormalMap.glb";

/* ASTEROID MODELS */
import ASTEROID_1 from "../../Assets/Models/SpaceDebris/Asteroid_1.glb";
import ASTEROID_2 from "../../Assets/Models/SpaceDebris/Asteroid_2.glb";
import ASTEROID_3 from "../../Assets/Models/SpaceDebris/Asteroid_3.glb";

/* PLANET TEXTURE */
import EIRIS_TEXTURE from "../../Assets/Models/PlanetTexture/EIRIS_TEXTURE.jpg";

/* LOGO TEXTURE */
import LOGO_TEXTURE from "../../Assets/Media/UI/SPARKY_LOGO.png";

const Logo = () => {
  const logoRef = useRef();
  const textureMap = useLoader(TextureLoader, LOGO_TEXTURE);

  useFrame(() => {
    const { current } = logoRef;
    if (current) current.rotation.y += 0.0005;
  }, []);

  return (
    <mesh ref={logoRef} scale={1} position={[0, 0, 15]}>
      <planeBufferGeometry args={[7, 5, 1]} />
      <meshBasicMaterial map={textureMap} side={DoubleSide} transparent={true}/>
    </mesh>
  )
}

const Planet = ({ source, xPos, yPos, zPos, planetScale }) => {
  const planetRef = useRef();
  const obj = useGLTF(source);

  useFrame(() => {
    const { current } = planetRef;
    if (current) current.rotation.y += 0.0003;
  }); 

  return (
    <mesh ref={planetRef} scale={planetScale} position={[xPos, yPos, zPos]}>
      <primitive object={obj.scene} />
    </mesh>
  );
};

const Asteroid = ({ source, xPos, yPos, zPos }) => {
  const asteroidRef = useRef();
  const obj = useGLTF(source);

  useFrame(() => {
    const { current } = asteroidRef;
    if (current) {
      current.rotation.y += 0.0003;
      current.rotation.x += 0.0006;
    }
  }); 

  return (
    <mesh ref={asteroidRef} scale={0.5} position={[xPos, yPos, zPos]}>
      <primitive object={obj.scene} />
    </mesh>
  );
};

const Eiris = () => {
  const eirisRef = useRef();
  const textureMap = useLoader(TextureLoader, EIRIS_TEXTURE);

  useFrame(() => {
    const { current } = eirisRef;
    if (current) current.rotation.y += 0.00007;
  }, []);

  return (
    <mesh ref={eirisRef} scale={1} position={[-20, -15, -5]}>
      <sphereGeometry args={[16, 16, 16]} />
      <meshStandardMaterial map={textureMap} />
    </mesh>
  )
}

const StarField = () => {
  const starsRef = useRef();

  useFrame(() => {
    const { current } = starsRef;
    if (current) current.rotation.y += 0.0001;
  })

  return (
    <Stars 
      ref={starsRef} 
      radius={80} // Adjust the radius to control the size of the stars
      depth={50} // Adjust the depth to control the size of the stars
      count={7000} // Number of stars in the field
      factor={3} // Density factor of the stars
      saturation={1} // Saturation of the stars' colors (0 means white stars)
      fade // Enable fading of distant stars 
    />
  )
}

const Scene = () => {
  const { entry } = useContext(StateContext);

  const handleOnLock = () => {
    console.log("hit")
  }

  return (
    <div id="space-canvas">
      <Suspense fallback={null}>
        <Canvas frameloop="always" camera={{ fov: 50, near: 1, far: 100000, position: [0, 0, 5.5] }}>
          <ambientLight intensity={0} />
          <Environment preset="sunset" />

          <Logo />

          <Planet source={MARS} xPos={1} yPos={1.5} zPos={-1} planetScale={2}/>
          <Planet source={MERCURY} xPos={-14} yPos={3} zPos={-2} planetScale={2}/>
          <Planet source={MOON} xPos={1.5} yPos={-0.6} zPos={3} planetScale={0.5}/>
          <Planet source={MOON_COLOR} xPos={-15} yPos={4} zPos={-20} planetScale={4}/>

          <Asteroid source={ASTEROID_1} xPos={-4} yPos={5} zPos={-5} />
          <Asteroid source={ASTEROID_2} xPos={-9} yPos={3} zPos={-3} />
          <Asteroid source={ASTEROID_3} xPos={3} yPos={0.5} zPos={-3} />

          <StarField />
          <Eiris />

          <PointerLockControls 
            enabled={entry} 
            minPolarAngle={1.3} 
            maxPolarAngle={1.9}
            minAzimuthAngle={0}
            maxAzimuthAngle={0}
            pointerSpeed={0.1}
            onLock={handleOnLock}
          />
          {/* <OrbitControls /> */}
          <EffectComposer>
            <DepthOfField focusDistance={15} bokehScale={2.5} focusRange={20}/>
            {/* <DotScreen scale={10} angle={Math.PI * 0.5}/> */}
            <Scanline density={2} />
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.3} height={window.innerHeight} />
            <Noise opacity={0.1} />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Scene;