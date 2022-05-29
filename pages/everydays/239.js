import {
  ContactShadows,
  Environment,
  MeshWobbleMaterial,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";

const Outer = withFrame(Inner);

function Inner() {
  return (
    <>
      <Ball />
      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -1.6, 0]}
        opacity={1}
        width={15}
        height={15}
        blur={5}
        far={1.6}
      />
      <Environment preset="studio" />
    </>
  );
}

function Ball() {
  return (
    <mesh position={[0, -5, 0]}>
      <circleBufferGeometry args={[64, 96, 128]} />
      <MeshWobbleMaterial
        color={color.yellow[900]}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={1}
        metalness={4}
        factor={1}
        speed={0}
        roughness={1000}
      />
    </mesh>
  );
}

export default function App(props) {
  return (
    <Canvas
      colorManagement={true}
      next={props.next}
      camera={{
        position: [-2.4128196325641946, 6.290024115911942, 79.5071029986906],
      }}
    >
      <color attach="background" args={[color.green[100]]} />
      <EffectComposer disableNormalPass={true} />
      <Outer next={props.next} />
    </Canvas>
  );
}
