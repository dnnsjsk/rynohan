import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  EffectComposer,
  HueSaturation,
  Scanline,
} from "@react-three/postprocessing";
import { useEffect, useState } from "react";
import * as colour from "../../constants/tailwind";
import { randomNumber } from "../../utils/randomNumber";
import { BlendFunction } from "postprocessing";

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
    </>
  );
}

function Ring(props) {
  const [color, setColor] = useState();

  useEffect(() => {
    setColor(colour.lime[`${randomNumber(3, 5)}00`]);
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
      camera={{ fov: 30, position: [1.716, -1.4380, -184.86] }}
    >
      <color attach="background" args={[color.lime[50]]} />
      <EffectComposer>
        <HueSaturation saturation={0.45} />
        <Scanline blendFunction={BlendFunction.OVERLAY} density={4} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
