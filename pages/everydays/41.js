import {
  Environment,
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
  HueSaturation,
} from "@react-three/postprocessing";
import { Suspense } from "react";

const Outer = withFrame(Inner);

function Inner() {
  return (
    <>
      <instancedMesh>
        {Array.from({ length: 200 }, (el, index) => {
          return (
            index !== 1 && (
              <Ring
                key={index}
                position={[0, index * 2, 0]}
                args={[index, index + 0.2, index * 100]}
              />
            )
          );
        })}
      </instancedMesh>
      <Environment preset="forest" />
    </>
  );
}

function Ring(props) {
  return (
    <mesh visible={true} rotation={[11, 0, 0]} position={props.position}>
      <ringBufferGeometry attach="geometry" args={props.args} />
      <MeshDistortMaterial distort={0.4} speed={1} color={color.green[500]} />
    </mesh>
  );
}

function Sphere() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereBufferGeometry attach="geometry" args={[10, 10, 10]} />
      <MeshWobbleMaterial
        attach="material"
        factor={50}
        speed={0.01}
        roughness={0}
      >
        <GradientTexture
          stops={[0, 0.5, 1]}
          colors={[color.emerald[800], color.emerald[800], color.pink[800]]}
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
      camera={{ position: [0, 200, 0] }}
    >
      <color attach="background" args={[color.indigo[500]]} />
      <EffectComposer>
        <HueSaturation saturation={0.6} />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={1.5}
          height={1000}
          opacity={1}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
