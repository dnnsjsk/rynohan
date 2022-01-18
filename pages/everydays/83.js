import { Environment, MeshWobbleMaterial, Sky } from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  DotScreen,
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
        {Array.from({ length: 200 }, (el, index) => {
          return (
            index !== 1 &&
            index !== 1 && (
              <Ring
                key={index}
                position={[0, index * 0.5, 0]}
                args={[index, index + 0.25, index]}
              />
            )
          );
        })}
      </instancedMesh>
      <Environment preset="apartment" />
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
      <torusKnotBufferGeometry attach="geometry" args={props.args} />
      <MeshWobbleMaterial factor={0.5} speed={0} attach="material" />
    </mesh>
  );
}

function Light() {
  return (
    <>
      <directionalLight
        castShadow={true}
        position={[100, -100, 100]}
        intensity={1}
        color={0xffffff}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={500}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={-100}
        shadow-camera-bottom={100}
      />
    </>
  );
}

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{ position: [515.178, 294.807, 56.597] }}
    >
      <color attach="background" args={["white"]} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.95} />
        <DotScreen
          blendFunction={BlendFunction.ADD}
          angle={Math.PI * 0.25}
          scale={111}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
