import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  HueSaturation,
} from "@react-three/postprocessing";
import * as color from "../../constants/tailwind";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import { MeshWobbleMaterial, GradientTexture } from "@react-three/drei";
import { interpolate } from "remotion";

const Outer = withFrame(Inner);

function Inner(props) {
  return (
    <>
      <Light />
      <Sphere />
      {Array.from({ length: 10 }, (item, index) => {
        return (
          <Square
            key={index}
            index={index}
            position={[0, 0, index * 2 * -1]}
            rotation={[
              0,
              0,
              interpolate(Math.sin((props.f / 100 * 30) * index), [-1, 1], [0.8, 2]),
            ]}
          />
        );
      })}
    </>
  );
}

function Light() {
  return (
    <directionalLight
      castShadow={true}
      position={[100, 100, -100]}
      intensity={1}
      color={0xffffff}
      shadow-mapSize-width={5120}
      shadow-mapSize-height={5120}
      shadow-camera-far={500}
      shadow-camera-left={-100}
      shadow-camera-right={100}
      shadow-camera-top={-100}
      shadow-camera-bottom={100}
    />
  );
}

function Sphere() {
  return (
    <mesh position={[0, 0, -15]}>
      <sphereBufferGeometry attach="geometry" />
      <MeshWobbleMaterial attach="material" factor={10} speed={2} roughness={1}>
        <GradientTexture
          stops={[0, 0.5, 1]}
          colors={[color.purple[800], color.rose[800], color.orange[800]]}
        />
      </MeshWobbleMaterial>
    </mesh>
  );
}

function Square(props) {
  return (
    <mesh visible={true} castShadow={true} {...props}>
      <torusBufferGeometry attach="geometry" args={[4, 0.075, 100, 4]} />
      <meshPhongMaterial
        attach="material"
        shininess={3000}
        color={color.gray[900]}
      />
    </mesh>
  );
}

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{ position: [0, 0, -18] }}
      gl={{
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false,
      }}
    >
      <color attach="background" args={[color.gray[900]]} />
      <fog color="#161616" attach="fog" near={8} far={30} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.2} />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={1.3}
          height={300}
          opacity={1}
        />
        <Noise opacity={0.025} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
