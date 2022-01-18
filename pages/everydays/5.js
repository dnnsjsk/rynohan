import {
  GradientTexture,
  MeshWobbleMaterial,
  Reflector,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  EffectComposer,
  HueSaturation,
  Noise,
} from "@react-three/postprocessing";
import { interpolate } from "remotion";

const Outer = withFrame(Inner);

function Inner(props) {
  return (
    <>
      <Light />
      <Pavement />
      {Array.from({ length: 200 }, (el, index) => {
        return (
          <Triangle
            key={index}
            args={[12, 0.0005 * index * -1, 16, 3]}
            rotation={[
              0,
              interpolate(Math.sin((50 / 1000) * index), [-4, 1], [0.8, 2]),
              interpolate(Math.sin((50 / 1000) * index), [-1, 1], [0.8, 2]),
            ]}
            position={[0.6 * index, 20.5, 0]}
            {...props}
          />
        );
      })}
    </>
  );
}

function Triangle(props) {
  return (
    <mesh
      castShadow={true}
      visible={true}
      position={props.position}
      rotation={props.rotation}
    >
      <torusBufferGeometry attach="geometry" args={props.args} />
      <MeshWobbleMaterial factor={0} speed={1} attach="material">
        <GradientTexture
          stops={[0, 0.25, 1]}
          colors={[color.green[400], color.yellow[400], color.sky[400]]}
        />
      </MeshWobbleMaterial>
    </mesh>
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
      camera={{ fov: 30, position: [198, 50, 0] }}
    >
      <color attach="background" args={[color.red[400]]} />
      <Outer next={props.next} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.65} />
        <Noise opacity={0.1} />
      </EffectComposer>
    </Canvas>
  );
}
