import {
  MeshDistortMaterial,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  Bloom,
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
      <Environment preset="night" />
    </>
  );
}

function Ball() {
  return (
    <mesh>
      <sphereBufferGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color.blue[400]}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0}
        speed={0}
        distort={100}
      />
    </mesh>
  );
}

export default function App(props) {
  return (
    <Canvas
      colorManagement={true}
      next={props.next}
      camera={{ position: [17.028, -0.0938, 0.3022] }}
    >
      <color attach="background" args={[color.gray[900]]} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.6} hue={120} />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={1.3}
          height={300}
          opacity={1}
        />
        <Noise opacity={0.025} />
        <DotScreen
          blendFunction={BlendFunction.ADD}
          angle={Math.PI * 0.25}
          scale={500}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
