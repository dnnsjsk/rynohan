import { MeshWobbleMaterial, Sky } from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  DotScreen,
  EffectComposer,
  HueSaturation,
  Sepia,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const Outer = withFrame(Inner);

function Inner() {
  return (
    <>
      <instancedMesh>
        {Array.from({ length: 200 }, (el, index) => {
          return (
            index !== 1 &&
            index !== 1 && (
              <Ring
                key={index}
                position={[0, index * 3, 0]}
                args={[index, index + 1, index * 1.4]}
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

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{ fov: 30, position: [0, -360, 0] }}
    >
      <color attach="background" args={[color.yellow[600]]} />
      <EffectComposer>
        <HueSaturation saturation={0.65} />
        <DotScreen
          blendFunction={BlendFunction.ADD}
          angle={Math.PI * 0.5}
          scale={1.0}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
