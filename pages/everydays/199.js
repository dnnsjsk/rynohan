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
      <cylinderBufferGeometry args={[256, 256, 256]} />
      <MeshWobbleMaterial
        color={color.blue[900]}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={1}
        metalness={4}
        factor={1000000}
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
        position: [
          -0.00007062401660243051, -103.11723974584805, -0.00007513596620345248,
        ],
      }}
    >
      <color attach="background" args={[color.sky[200]]} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.7} />
        <Scanline blendFunction={BlendFunction.OVERLAY} density={10} />
        <ChromaticAberration
          blendFunction={BlendFunction.OVERLAY}
          offset={[0.02, 0.75]}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
