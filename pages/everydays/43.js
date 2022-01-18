import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  EffectComposer,
  HueSaturation,
  Scanline,
} from "@react-three/postprocessing";
import { Suspense, useEffect, useState } from "react";
import * as colour from "../../constants/tailwind";
import { randomNumber } from "../../utils/randomNumber";
import { BlendFunction } from "postprocessing";
import { Environment } from "@react-three/drei";

const Outer = withFrame(Inner);

function Inner() {
  return (
    <>
      <instancedMesh>
        {Array.from({ length: 150 }, (el, index) => {
          return (
            index !== 1 &&
            index !== 1 && (
              <Ring
                key={index}
                position={[0, 0, 0]}
                args={[index, index * 1.013, 4]}
                rotation={[index * 0.1, index * 0.05, 0]}
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
  const [color, setColor] = useState();

  useEffect(() => {
    setColor(colour.blueGray[`${randomNumber(3, 5)}00`]);
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
      camera={{ position: [127.559, 5.1164, 114.417] }}
    >
      <color attach="background" args={[color.blueGray[50]]} />
      <EffectComposer>
        <HueSaturation saturation={0.8} />
        <Scanline blendFunction={BlendFunction.OVERLAY} density={10} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
