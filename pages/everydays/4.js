import {
  GradientTexture,
  MeshDistortMaterial,
  Reflector,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  Bloom,
  EffectComposer,
  HueSaturation,
  Noise,
} from "@react-three/postprocessing";

const Outer = withFrame(Inner);

function Inner() {
  return (
    <>
      <Light />
      <Pavement />
      <mesh
        castShadow={true}
        position={[0, 10, 0]}
        rotation={[0, 0, 0]}
        visible={true}
      >
        <sphereBufferGeometry attach="geometry" args={[40, 40, 50]} />
        <MeshDistortMaterial distort={1} speed={0.1} attach="material">
          <GradientTexture
            stops={[0, 0.25, 0.5]}
            colors={[color.green[800], color.amber[700], color.sky[800]]}
          />
        </MeshDistortMaterial>
      </mesh>
    </>
  );
}

function Light() {
  return (
    <>
      <directionalLight position={[-40, 20, 20]} color="#c59cf1" />
      <directionalLight
        position={[10.5, 20, 10]}
        intensity={1.5}
        color="#e78f48"
      />
      <ambientLight color="#8d69cb" />
    </>
  );
}

function Pavement() {
  return (
    <>
      <Reflector
        blur={[1024, 1024]}
        mixBlur={0.75}
        mixStrength={0.25}
        resolution={2048}
        args={[1000, 1000]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        mirror={1}
        minDepthThreshold={0.25}
        maxDepthThreshold={1}
        depthScale={50}
      >
        {(Material, props) => (
          <Material metalness={0} roughness={1} {...props} />
        )}
      </Reflector>
    </>
  );
}

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{ fov: 30, position: [0, 180, 0], rotation: [10, 10, 10] }}
    >
      <Outer next={props.next} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.65} />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={1.3}
          height={300}
          opacity={1}
        />
        <Noise opacity={0.075} />
      </EffectComposer>
    </Canvas>
  );
}
