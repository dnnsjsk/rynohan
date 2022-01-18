import {
  MeshWobbleMaterial,
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
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const Outer = withFrame(Inner);

function Inner(props) {
  return (
    <>
      <Ball next={props.next} />
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
      <boxBufferGeometry args={[32, 128, 128]} />
      <MeshWobbleMaterial
        color={color.warmGray[300]}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.1}
        factor={10}
        speed={0}
        roughness={0.5}
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
      camera={{ position: [21.2966, 5.9255, 6.3678] }}
    >
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.9} />
        <DotScreen
          blendFunction={BlendFunction.MULTIPLY}
          angle={Math.PI * 0.25}
          scale={500}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
