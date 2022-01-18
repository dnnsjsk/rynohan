import {
  Environment,
  MeshDistortMaterial,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  Bloom,
  EffectComposer,
  HueSaturation,
} from "@react-three/postprocessing";

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
                position={[0, index * 0.1, 0]}
                args={[index, index + 0.05, 100]}
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
      <MeshDistortMaterial distort={0.4} speed={0} color={color.yellow[500]} />
    </mesh>
  );
}

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{ position: [0, 189, 0] }}
    >
      <color attach="background" args={[color.rose[500]]} />
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
