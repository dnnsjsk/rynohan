import {
  MeshWobbleMaterial,
  ContactShadows,
  Environment,
  GradientTexture,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";
import { Pixelation } from "@react-three/postprocessing";

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
      <boxBufferGeometry args={[256, 256, 256]} />
      <MeshWobbleMaterial
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.1}
        factor={10}
        speed={0}
        roughness={0.5}
      >
        <GradientTexture
          stops={[0, 0.25, 1]}
          colors={[color.red[400], color.indigo[400], color.green[400]]}
        />
      </MeshWobbleMaterial>
    </mesh>
  );
}

export default function App(props) {
  return (
    <Canvas
      colorManagement={true}
      style={{ background: "#ffffff" }}
      next={props.next}
      camera={{
        position: [47.47277496235172, 179.11639858754035, 55.74585772667591],
      }}
    >
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.97} />
        <Pixelation granularity={20} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
