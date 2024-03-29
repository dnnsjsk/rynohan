import {
  ContactShadows,
  Environment,
  MeshWobbleMaterial,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  ChromaticAberration,
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
      <Environment preset="warehouse" />
    </>
  );
}

function Ball() {
  return (
    <mesh position={[0, -5, 0]}>
      <circleBufferGeometry args={[60, 96, 128]} />
      <MeshWobbleMaterial
        color={color.pink[800]}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={1}
        metalness={20}
        factor={10000}
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
        position: [-1.297646730213194, -20.078844775891955, -58.54120357964987],
      }}
    >
      <color attach="background" args={[color.purple[200]]} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.4} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.02, 0.1]}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
