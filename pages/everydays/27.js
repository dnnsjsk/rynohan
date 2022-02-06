import {
  Environment,
  GradientTexture,
  MeshWobbleMaterial,
  Reflector,
  Sky,
} from "@react-three/drei";
import * as THREE from "three";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
  EffectComposer,
  HueSaturation,
  Glitch,
  Scanline,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const Outer = withFrame(Inner);

function Inner(props) {
  return (
    <>
      <Sky
        distance={4500}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <mesh
        castShadow={true}
        position={[0, 10, 0]}
        rotation={[0, 0, 0]}
        visible={true}
      >
        <ambientLight intensity={0.1} />
        <boxGeometry attach="geometry" args={[500, 500, 20]} />
        <meshPhongMaterial attach="material" shininess={3000} />
      </mesh>
      <Reflector
        blur={[1024, 1024]}
        mixBlur={0}
        mixStrength={0.25}
        resolution={2024}
        args={[500, 500]}
        position={[0, 0, 10.01]}
        rotation={[0, 0, 0]}
        mirror={1}
        minDepthThreshold={0.25}
        maxDepthThreshold={1}
        depthScale={10}
      >
        {(Material, props) => (
          <Material metalness={6} roughness={0.5} {...props} />
        )}
      </Reflector>
      {[
        {
          color: color.rose[400],
          coord: [-5, 40, 100],
        },
      ].map((item, index) => {
        return (
          <Torus
            key={index}
            position={item.coord}
            rotation={[0, 0, 0]}
            color={item.color}
          />
        );
      })}
      <Ground />
      {!props.next && <Environment preset="warehouse" />}
    </>
  );
}

function Light() {
  const light = new THREE.DirectionalLight(0xffffff, 1, null);
  light.position.set(100, 100, 100);
  light.castShadow = true;
  light.shadow.mapSize.width = 500;
  light.shadow.mapSize.height = 500;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 500;
  light.shadow.camera.top = -100;
  light.shadow.camera.right = 100;
  light.shadow.camera.left = -100;
  light.shadow.camera.bottom = 100;
  return <primitive object={light} />;
}

function Ground() {
  return (
    <mesh receiveShadow={true} rotation={[300, 0, 0]} position={[0, 0, 0]}>
      <pointLight intensity={0.3} position={[10, -10, 10]} />
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial
        attach="material"
        shininess={0}
        color={color.indigo[300]}
      />
    </mesh>
  );
}

function Torus({ position, rotation, args = [40, 10, 16, 5] }) {
  return (
    <mesh
      castShadow={true}
      rotation={rotation}
      position={position}
      visible={true}
    >
      <ambientLight intensity={0.1} />
      <sphereBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        factor={10}
        speed={0.1}
        attach="material"
        shininess={40}
      >
        <GradientTexture
          stops={[0, 0.25, 0.35, 0.5, 0.75, 1]}
          colors={[
            color.yellow[400],
            color.orange[200],
            color.red[300],
            color.blue[400],
            color.orange[400],
            color.green[400],
          ]}
        />
      </MeshWobbleMaterial>
    </mesh>
  );
}

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      colorManagement={true}
      camera={{
        position: [-28.696, -166.5676, 32.232],
        fov: 75,
      }}
    >
      <EffectComposer>
        <HueSaturation saturation={0.8} />
        <Scanline blendFunction={BlendFunction.OVERLAY} density={1.25} />
        <Glitch
          delay={[1.5, 3.5]}
          duration={[0.6, 1.0]}
          strength={[0.1, 0.2]}
          active
          ratio={0.85}
        />
      </EffectComposer>
      <Outer next={props.next} />
    </Canvas>
  );
}
