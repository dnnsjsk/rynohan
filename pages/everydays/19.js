import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as colour from "../../constants/tailwind";
import {
  DotScreen,
  EffectComposer,
  HueSaturation,
  Scanline,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useEffect, useState } from "react";
import { randomNumber } from "../../utils/randomNumber";

const Outer = withFrame(Inner);

function Inner() {
  return (
    <>
      <instancedMesh>
        {Array.from({ length: 300 }, (el, index) => {
          return (
            <Ring
              key={index}
              position={[0, 0, 0]}
              args={[0.1, 100, 1000]}
              rotation={[index * 0.5, index, 0]}
            />
          );
        })}
      </instancedMesh>
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
      camera={{ fov: 30, position: [-560.79, -38.82, 9.822] }}
    >
      <color attach="background" args={[colour.blueGray[200]]} />
      <EffectComposer>
        <HueSaturation saturation={0.65} />
        <DotScreen
          blendFunction={BlendFunction.ADD}
          angle={Math.PI * 0.25}
          scale={500}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
