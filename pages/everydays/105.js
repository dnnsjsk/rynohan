import {
  ContactShadows,
  Environment,
  MeshWobbleMaterial,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  EffectComposer,
  HueSaturation,
  Pixelation,
  Scanline,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

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
      <Environment preset="forest" />
    </>
  );
}

function Ball() {
  return (
    <mesh position={[0, -5, 0]}>
      <tetrahedronBufferGeometry args={[72, 24, 24]} />
      <MeshWobbleMaterial
        color={color.emerald[900]}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={1}
        metalness={4}
        factor={20}
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
        position: [-53.994960933634125, 67.4589578966127, -16.668329048780254],
      }}
    >
      <color attach="background" args={[color.black]} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.8} />
        <Scanline blendFunction={BlendFunction.MULTIPLY} density={10} />
        <Pixelation granularity={1} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
