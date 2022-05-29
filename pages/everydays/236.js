import {
  MeshDistortMaterial,
  ContactShadows,
  Environment,
  GradientTexture,
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
      <coneBufferGeometry args={[15, 1, 30, 10]} />
      <MeshDistortMaterial
        envMapIntensity={1}
        clearcoat={0}
        clearcoatRoughness={0}
        metalness={1}
        distort={1000}
        speed={0}
      >
        <GradientTexture
          stops={[0, 0.25, 0.35, 0.5, 0.75, 1]}
          colors={[
            color.indigo[400],
            color.blue[200],
            color.green[300],
            color.blueGray[400],
            color.yellow[400],
            color.fuchsia[400],
          ]}
        />
      </MeshDistortMaterial>
    </mesh>
  );
}

export default function App(props) {
  return (
    <Canvas
      colorManagement={true}
      style={{ background: "#212121" }}
      next={props.next}
      camera={{
        position: [91.69417645028652, 75.45656465374482, 38.90398695489017],
      }}
    >
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.8} />
        <Scanline blendFunction={BlendFunction.MULTIPLY} density={10000} />
        <Pixelation granularity={10} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
