import {
  ContactShadows,
  Environment,
  MeshWobbleMaterial,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  EffectComposer,
  HueSaturation,
  Pixelation,
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
      <Environment preset="warehouse" />
    </>
  );
}

function Ball() {
  return (
    <mesh position={[0, -5, 0]}>
      <boxBufferGeometry args={[40, 96, 128]} />
      <MeshWobbleMaterial
        color={color.red[900]}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={1}
        metalness={4}
        factor={10000000}
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
          -0.00004050393881986121, 40.609197602534884, 0.0000029219633809760376,
        ],
      }}
    >
      <color attach="background" args={[color.green[100]]} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.8} />
        <Scanline blendFunction={BlendFunction.MULTIPLY} density={10000} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
