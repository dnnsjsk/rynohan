import {
  MeshDistortMaterial,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  DepthOfField,
  DotScreen,
  EffectComposer,
  HueSaturation,
  Noise,
  Vignette,
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
      <Environment preset="warehouse" />
    </>
  );
}

function Ball() {
  return (
    <mesh>
      <sphereBufferGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color.cyan[400]}
        envMapIntensity={1}
        clearcoat={0.25}
        clearcoatRoughness={0}
        metalness={0.5}
        distort={5}
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
      camera={{ position: [1.372, 0.7404, -0.854] }}
    >
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.7} />
        <DotScreen
          blendFunction={BlendFunction.ADD}
          angle={Math.PI * 0.25}
          scale={500}
        />
        <Noise opacity={0.025} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <DepthOfField />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
