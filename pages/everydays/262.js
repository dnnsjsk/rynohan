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
      <Environment preset="sunset" />
    </>
  );
}

function Ball() {
  return (
    <mesh position={[0.5, 1, 0]}>
      <boxGeometry args={[256, 256, 256]} />
      <MeshWobbleMaterial
        color={color.cyan[900]}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={1}
        metalness={4}
        factor={100000}
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
        position: [132.43173953104488, 47.45763123853622, -172.4802157238004],
      }}
    >
      <color attach="background" args={[color.blue[200]]} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.6} />
        <DotScreen
          blendFunction={BlendFunction.OVERLAY}
          angle={Math.PI * 0.25}
          scale={10}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.OVERLAY}
          offset={[0.1, 1]}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
