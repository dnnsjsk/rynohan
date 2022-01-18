import { Sky } from "@react-three/drei";
import * as THREE from "three";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";

const Outer = withFrame(Inner);

function Inner() {
  return (
    <>
      <Light />
      <Sky
        distance={4500}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <Donut
        position={[0, 3, 0]}
        rotation={[300, 0, 0]}
        color={color.cyan[500]}
      />
      <Donut
        position={[16, 6.9, 4]}
        rotation={[256.1, 60, 0]}
        color={color.pink[500]}
      />
      <Donut
        position={[-30, 3, -20]}
        rotation={[300, 0, 0]}
        color={color.indigo[500]}
      />
      <Ground />
    </>
  );
}

function Light() {
  const light = new THREE.DirectionalLight(0xffffff, 1, 100);
  light.position.set(100, 100, 100);
  light.castShadow = true;
  light.shadow.mapSize.width = 5120;
  light.shadow.mapSize.height = 5120;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 500;
  light.shadow.camera.top = -100;
  light.shadow.camera.right = 100;
  light.shadow.camera.left = -100;
  light.shadow.camera.bottom = 100;
  return <primitive object={light} />;
}

function Ground() {
  return (
    <mesh receiveShadow={true} rotation={[300, 0, 0]} position={[0, 0, 0]}>
      <pointLight intensity={0.3} position={[10, -10, 10]} />
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial
        attach="material"
        shininess={4000}
        color={color.yellow[300]}
      />
    </mesh>
  );
}

function Donut({ position, rotation, color, args = [12, 2, 16, 50] }) {
  return (
    <mesh
      castShadow={true}
      rotation={rotation}
      position={position}
      visible={true}
    >
      <ambientLight intensity={0.1} />
      <torusBufferGeometry attach="geometry" args={args} />
      <meshPhongMaterial attach="material" shininess={3000} color={color} />
    </mesh>
  );
}

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{
        position: [-5.3, 43.15, -25.19],
        fov: 75,
      }}
      shadows={true}
    >
      <EffectComposer>
        <HueSaturation saturation={0.2} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
