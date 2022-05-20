import {
  MeshWobbleMaterial,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  ChromaticAberration,
  EffectComposer,
  Grid,
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
        blur={2}
        far={1.6}
      />
      <Environment preset="lobby" />
    </>
  );
}

function Ball() {
  return (
    <mesh>
      <sphereBufferGeometry args={[1, 64, 64]} />
      <MeshWobbleMaterial
        color={color.blue[400]}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.1}
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
      style={{ background: "#202020" }}
      next={props.next}
      camera={{
        position: [
          5.6303184902544016e-8, 1.3219999999993561, -0.0000013208004964298326,
        ],
      }}
    >
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.8} />
        <Grid
          blendFunction={BlendFunction.OVERLAY}
          angle={Math.PI * 0.25}
          scale={10}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.02, 0.002]}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
