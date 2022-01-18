import {
  ContactShadows,
  Environment,
  MeshWobbleMaterial,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  DotScreen,
  EffectComposer,
  HueSaturation,
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
      <Environment preset="apartment" />
    </>
  );
}

function Ball() {
  return (
    <mesh position={[0, -5, 0]}>
      <cylinderBufferGeometry args={[2, 96, 128]} />
      <MeshWobbleMaterial
        color={color.indigo[900]}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={1}
        metalness={20}
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
      camera={{ position: [0, 80, 0] }}
    >
      <color attach="background" args={[color.purple[100]]} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.8} />
        <DotScreen
          blendFunction={BlendFunction.SCREEN}
          angle={Math.PI * 0.25}
          scale={1000}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
