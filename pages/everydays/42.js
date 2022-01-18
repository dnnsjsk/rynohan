import {
  MeshDistortMaterial,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  DotScreen,
  EffectComposer,
  HueSaturation,
  Noise,
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
        far={1.6}
      />
      <Environment preset="apartment" />
    </>
  );
}

function Ball() {
  return (
    <mesh>
      <sphereBufferGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color.orange[300]}
        envMapIntensity={1}
        clearcoat={0.25}
        clearcoatRoughness={0}
        metalness={0.5}
        distort={20}
        speed={0}
      />
    </mesh>
  );
}

export default function App(props) {
  return (
    <Canvas
      colorManagement={true}
      style={{ background: "#202020" }}
      next={props.next}
      camera={{ position: [0.2451, -1.2642, -3.2139] }}
    >
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.7} />
        <DotScreen
          blendFunction={BlendFunction.ADD}
          angle={Math.PI * 0.25}
          scale={500}
        />
        <Noise opacity={0.025} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
