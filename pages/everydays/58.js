import {
  MeshDistortMaterial,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  EffectComposer,
  HueSaturation,
  Noise,
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
        blur={2}
        far={2}
      />
      <Environment preset="warehouse" />
    </>
  );
}

function Ball() {
  return (
    <mesh>
      <sphereBufferGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color.indigo[300]}
        envMapIntensity={1}
        clearcoat={0.25}
        clearcoatRoughness={0}
        metalness={0.5}
        distort={0.87}
        speed={0}
      />
    </mesh>
  );
}

export default function App(props) {
  return (
    <Canvas
      colorManagement={true}
      style={{ background: "#fff" }}
      next={props.next}
      camera={{ position: [3, -1.5, 0.65] }}
    >
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.8} />
        <Scanline blendFunction={BlendFunction.OVERLAY} density={10} />
        <Noise opacity={0.025} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
