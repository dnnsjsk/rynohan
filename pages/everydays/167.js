import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as colour from "../../constants/tailwind";
import {
  ChromaticAberration,
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
      camera={{
        fov: 30,
        position: [
          -0.000012557164692394002, -150.84434065711608, 0.00015032076614732075,
        ],
      }}
    >
      <color attach="background" args={[colour.blueGray[200]]} />
      <EffectComposer>
        <HueSaturation saturation={0.55} />

        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.02, 0.5]}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
