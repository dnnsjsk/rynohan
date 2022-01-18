import {
  GradientTexture,
  MeshWobbleMaterial,
  Reflector,
  Stars,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  Bloom,
  EffectComposer,
  HueSaturation,
  Noise,
} from "@react-three/postprocessing";

const Outer = withFrame(Inner);

function Inner() {
  return (
    <>
      <Stars radius={25} depth={5} count={10000} factor={15} saturation={1} />
      <Light />
      <Pavement />
      <Sphere
        args={[10, 2, 30, 10]}
        position={[50, 30, 40]}
        rotation={[100, 45, -10]}
      />
      <Torus
        args={[60, 2, 30, 3]}
        position={[-60, 60, -30]}
        rotation={[20, 0, -10]}
        colors={[color.gray[200], color.green[200], color.blue[400]]}
      />
    </>
  );
}

function Torus(props) {
  return (
    <mesh
      castShadow={true}
      visible={true}
      position={props.position}
      rotation={props.rotation}
    >
      <torusBufferGeometry attach="geometry" args={props.args} />
      <MeshWobbleMaterial
        shininess={1000}
        factor={0.5}
        speed={1}
        attach="material"
      >
        <GradientTexture stops={[0, 0.25, 1]} colors={props.colors} />
      </MeshWobbleMaterial>
    </mesh>
  );
}

function Sphere(props) {
  return (
    <mesh
      castShadow={true}
      visible={true}
      position={props.position}
      rotation={props.rotation}
    >
      <sphereBufferGeometry attach="geometry" args={props.args} />
      <MeshWobbleMaterial factor={0.5} speed={1} attach="material">
        <GradientTexture
          stops={[0, 0.25, 1]}
          colors={[color.green[400], color.orange[400], color.sky[400]]}
        />
      </MeshWobbleMaterial>
    </mesh>
  );
}

function Light() {
  return (
    <>
      <directionalLight position={[-40, 20, 20]} color={color.fuchsia[800]} />
      <directionalLight
        position={[10.5, 20, 10]}
        intensity={1.5}
        color={color.fuchsia[200]}
      />
      <ambientLight color={color.rose[100]} />
    </>
  );
}

function Pavement() {
  return (
    <>
      <Reflector
        blur={[1024, 1024]}
        mixBlur={0.1}
        mixStrength={0.25}
        resolution={2048}
        args={[1000, 1000]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        mirror={1}
        minDepthThreshold={0.25}
        maxDepthThreshold={1}
        depthScale={50}
      >
        {(Material, props) => (
          <Material metalness={0.5} roughness={1} {...props} />
        )}
      </Reflector>
    </>
  );
}

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{ fov: 30, position: [97, 129, 21] }}
    >
      <color attach="background" args={[color.black]} />
      <Outer next={props.next} />
      <EffectComposer disableNormalPass={true}>
        <HueSaturation saturation={0.9} hue={4} />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={5}
          height={1000}
          opacity={1}
        />
      </EffectComposer>
    </Canvas>
  );
}
