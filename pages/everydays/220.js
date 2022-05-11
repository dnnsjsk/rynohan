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
  ChromaticAberration,
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
        color={color.blue[400]}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0}
        speed={0}
        distort={130}
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
        position: [394.50927410599195, 135.64293124700927, -617.2553053002049],
      }}
    >
      <color attach="background" args={[color.green[900]]} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.8} />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={1.3}
          height={300}
          opacity={1}
        />
        <Noise opacity={0.025} />
        <Scanline blendFunction={BlendFunction.OVERLAY} density={1.25} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.02, 0.5]}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
