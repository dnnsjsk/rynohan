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
    HueSaturation, Pixelation,
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
      <Environment preset="forest" />
    </>
  );
}

function Ball() {
  return (
    <mesh>
      <sphereBufferGeometry args={[1, 64, 64]} />
      <MeshWobbleMaterial
        color={color.green[400]}
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
            0.8584712285922782, -0.9499213021741576, 0.3291818180813174
        ],
      }}
    >
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.6} />
        <DotScreen
          blendFunction={BlendFunction.OVERLAY}
          angle={Math.PI * 0.25}
          scale={100}
        />
          <Pixelation granularity={5}/>
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}