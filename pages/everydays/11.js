import {
  MeshDistortMaterial,
  ContactShadows,
  Environment,
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
      <Environment preset="warehouse" />
    </>
  );
}

function Ball() {
  return (
    <mesh>
      <sphereBufferGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color.orange[400]}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.1}
        distort={0.4}
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
      camera={{ position: [-1, -1.5, 3] }}
    >
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.5} />
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
