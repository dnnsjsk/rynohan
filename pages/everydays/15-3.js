import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  EffectComposer,
  HueSaturation,
  Noise,
} from "@react-three/postprocessing";

const Outer = withFrame(Inner);

function Inner() {
  const randomColors = [
    color.blue["400"],
    color.green["400"],
    color.yellow["400"],
    color.rose["400"],
    color.emerald["400"],
    color.pink["400"],
    color.indigo["400"],
    color.orange["300"],
    color.sky["400"],
  ];

  return (
    <>
      <instancedMesh position={[0, 410, 0]}>
        {Array.from({ length: 100 }, (el, index) => {
          return (
            index !== 1 &&
            index !== 1 && (
              <Ring
                color={randomColors[index % randomColors.length]}
                key={index}
                position={[0, index * 32 * -1, -20]}
                args={[index * 2, index * 0.4, 2000]}
                rotation={[index * 0.45, index * 0.01, 0]}
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
      rotation={props.rotation}
      castShadow={true}
      position={props.position}
    >
      <ringBufferGeometry attach="geometry" args={props.args} />
      <meshBasicMaterial attach="material" color={props.color} />
    </mesh>
  );
}

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{
        fov: 30,
        position: [313.0705553841375, -269.9452102623953, -380.48181403038853],
      }}
    >
      <color attach="background" args={[color.orange[200]]} />
      <EffectComposer>
        <HueSaturation saturation={0.25} />
        <Noise opacity={0.5} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
