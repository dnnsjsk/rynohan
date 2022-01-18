import { MeshWobbleMaterial, Sky } from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  Bloom,
  EffectComposer,
  Glitch,
  HueSaturation,
} from "@react-three/postprocessing";
import { interpolate, useCurrentFrame } from "remotion";

const Outer = withFrame(Inner);

function Inner(props) {
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
        {Array.from({ length: 100 }, (el, index) => {
          return (
            index !== 1 &&
            index !== 1 && (
              <Ring
                key={index}
                position={[10, index - 60, 0]}
                args={[index, index + 0.25, 1]}
                rotation={[
                  interpolate(
                    Math.sin((props.f / 100) * index * 0.01),
                    [1, 10],
                    [2, 20]
                  ),
                  0,
                  0,
                ]}
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
      castShadow={true}
      position={props.position}
      rotation={props.rotation}
    >
      <ringBufferGeometry attach="geometry" args={props.args} />
      <MeshWobbleMaterial factor={0} attach="material" />
    </mesh>
  );
}

function Light() {
  return (
    <>
      <directionalLight
        position={[10.5, 20, 10]}
        intensity={1.5}
        color={color.cyan[900]}
      />
      <ambientLight color={color.pink[700]} />
    </>
  );
}

export default function App(props) {
  const currentFrame = useCurrentFrame();

  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{
        fov: 30,
        position: [-95.14759265079736, -115.07431757165136, -84.0687154669654],
      }}
    >
      <EffectComposer>
        <HueSaturation saturation={0.9} />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={1.5}
          height={1000}
          opacity={1}
        />
        <Glitch
          active={currentFrame > 540}
          delay={[0, 0]}
          duration={1}
          strength={0.5}
          ratio={0.5}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
