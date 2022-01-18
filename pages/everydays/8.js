import {
  GradientTexture,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  Bloom,
  EffectComposer,
  Sepia,
  HueSaturation,
  Noise,
} from "@react-three/postprocessing";

const Outer = withFrame(Inner);

function Inner() {
  return (
    <>
      <Light />
      <instancedMesh>
        {Array.from({ length: 20 }, (el, index) => {
          return (
            index !== 1 && (
              <Ring
                key={index}
                position={[0, index * 0.5, 0]}
                args={[index, index + 0.5, index * 100]}
              />
            )
          );
        })}
      </instancedMesh>
      <Sphere />
    </>
  );
}

function Ring(props) {
  return (
    <mesh visible={true} rotation={[11, 0, 0]} position={props.position}>
      <ringBufferGeometry attach="geometry" args={props.args} />
      <MeshDistortMaterial distort={0.4} speed={1} color={color.yellow[300]} />
    </mesh>
  );
}

function Sphere() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereBufferGeometry attach="geometry" args={[5, 5, 5]} />
      <MeshWobbleMaterial attach="material" factor={10} speed={0.1} roughness={1}>
        <GradientTexture
          stops={[0, 0.5, 1]}
          colors={[color.blue[800], color.cyan[800], color.yellow[800]]}
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

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{ fov: 30, position: [0, -80, 0] }}
    >
      <color attach="background" args={[color.indigo[600]]} />
      <EffectComposer>
        <HueSaturation saturation={0.6} />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={1.5}
          height={1000}
          opacity={1}
        />
        <Noise opacity={0.25} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
