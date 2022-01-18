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
import { Suspense } from "react";

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
      <torusBufferGeometry args={[10, 2, 2, 20]} />
      <MeshDistortMaterial
        envMapIntensity={1}
        clearcoat={0}
        clearcoatRoughness={0}
        metalness={1}
        distort={20}
        speed={0}
      >
        <GradientTexture
          stops={[0, 0.25, 0.35, 0.5, 0.75, 1]}
          colors={[
            color.blue[400],
            color.green[200],
            color.emerald[300],
            color.indigo[400],
            color.orange[400],
            color.sky[400],
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
      camera={{ position: [71.2, 5.6, -406] }}
    >
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.8} />
      </EffectComposer>
      {props.next ? (
        <Suspense fallback={null}>
          <Outer next={props.next} />
        </Suspense>
      ) : (
        <Outer next={props.next} />
      )}
    </Canvas>
  );
}
