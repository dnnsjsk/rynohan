import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as colour from "../../constants/tailwind";
import {
  DotScreen,
  EffectComposer,
  HueSaturation,
} from "@react-three/postprocessing";
import { useEffect, useState } from "react";
import { randomNumber } from "../../utils/randomNumber";
import { BlendFunction } from "postprocessing";

const Outer = withFrame(Inner);

function Inner() {
  return (
    <>
      <instancedMesh>
        {Array.from({ length: 10 }, (el, index) => {
          return (
            <Ring
              key={index}
              position={[0, 0, 0]}
              args={[10, 100, 1000]}
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
    setColor(colour.yellow[`${randomNumber(3, 9)}00`]);
  }, []);

  return (
    <mesh
      visible={true}
      rotation={props.rotation}
      castShadow={true}
      position={props.position}
    >
      <torusKnotBufferGeometry attach="geometry" args={props.args} />
      <meshBasicMaterial attach="material" color={color} />
    </mesh>
  );
}

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{ fov: 30, position: [-25.0533, 85.081, -1.456] }}
    >
      <color attach="background" args={[colour.blueGray[200]]} />
      <EffectComposer>
        <HueSaturation saturation={0.3} />
        <DotScreen
          blendFunction={BlendFunction.SCREEN}
          angle={Math.PI * 0.25}
          scale={100}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
