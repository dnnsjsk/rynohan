import {
  MeshDistortMaterial,
  ContactShadows,
  Environment,
  GradientTexture,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";

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
      <torusBufferGeometry args={[15, 1, 30, 10]} />
      <MeshDistortMaterial
        envMapIntensity={1}
        clearcoat={0}
        clearcoatRoughness={0}
        metalness={1}
        distort={3}
        speed={0}
      >
        <GradientTexture
          stops={[0, 0.25, 0.35, 0.5, 0.75, 1]}
          colors={[
            color.yellow[400],
            color.orange[200],
            color.red[300],
            color.blue[400],
            color.orange[400],
            color.green[400],
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
      style={{ background: "#202020" }}
      next={props.next}
      camera={{ position: [-1.6, -0.5, 5] }}
    >
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.9} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
