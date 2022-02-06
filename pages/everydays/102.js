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
      <boxBufferGeometry args={[128, 128, 128]} />
      <MeshWobbleMaterial
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.1}
        factor={100}
        speed={0}
        roughness={0.5}
      >
        <GradientTexture
          stops={[0, 0.25, 1]}
          colors={[color.blue[400], color.rose[400], color.green[400]]}
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
        position: [
          -0.000030594490747234745, -117.90812074802946, 0.00011386967147379542,
        ],
      }}
    >
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.9} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
