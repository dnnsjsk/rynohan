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
      <boxBufferGeometry args={[256, 128, 128]} />
      <MeshWobbleMaterial
        color={color.fuchsia[900]}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={1}
        metalness={0}
        factor={10}
        speed={0}
        roughness={0}
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
        position: [-29.76498888167073, -1.807438522712698, -37.32487708643372],
      }}
    >
      <color attach="background" args={[color.fuchsia[100]]} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.8} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
