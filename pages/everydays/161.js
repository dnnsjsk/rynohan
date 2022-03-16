import { MeshWobbleMaterial, Sky } from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  HueSaturation,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const Outer = withFrame(Inner);

function Inner() {
  return (
    <>
      <Light />
      <Sky
        distance={4500}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <instancedMesh>
        {Array.from({ length: 50 }, (el, index) => {
          return (
            index !== 1 &&
            index !== 1 && (
              <Ring
                key={index}
                position={[10, index - 30, 0]}
                args={[index, index + 0.5, 1]}
              />
            )
          );
        })}
      </instancedMesh>
    </>
  );
}

function Ring(props) {
  return (
    <mesh
      visible={true}
      rotation={[11, 0, 0]}
      castShadow={true}
      position={props.position}
    >
      <ringBufferGeometry attach="geometry" args={props.args} />
      <MeshWobbleMaterial factor={0.5} attach="material" />
    </mesh>
  );
}

function Light() {
  return (
    <>
      <directionalLight
        position={[10.5, 20, 10]}
        intensity={1.5}
        color={color.cyan[900]}
      />
      <ambientLight color={color.red[700]} />
    </>
  );
}

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{
        fov: 30,
        position: [47.61321422352979, 9.570686574563586, -18.85502731593456],
      }}
    >
      <EffectComposer>
        <HueSaturation saturation={0.6} />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={1.5}
          height={1000}
          opacity={1}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.02, 0.5]}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
