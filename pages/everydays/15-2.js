import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  EffectComposer,
  HueSaturation,
  Noise,
} from "@react-three/postprocessing";
import { useEffect, useState } from "react";
import * as colors from "../../constants/colors";

const Outer = withFrame(Inner);

function Inner() {
  return (
    <>
      <instancedMesh position={[0, 400, 0]}>
        {Array.from({ length: 100 }, (el, index) => {
          return (
            index !== 1 &&
            index !== 1 && (
              <Ring
                key={index}
                position={[0, index * 30 * -1, -20]}
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
  const [color, setColor] = useState();

  useEffect(() => {
    setColor(colors.colors[Math.floor(Math.random() * colors.colors.length)]);
  }, []);

  return (
    <mesh
      visible={true}
      rotation={props.rotation}
      castShadow={true}
      position={props.position}
    >
      <ringBufferGeometry attach="geometry" args={props.args} />
      <meshBasicMaterial attach="material" color={color} />
    </mesh>
  );
}

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{ fov: 30, position: [70.1083, -124.94612, -543.252499] }}
    >
      <color attach="background" args={[color.indigo[400]]} />
      <EffectComposer>
        <HueSaturation saturation={0.2} />
        <Noise opacity={0.25} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
