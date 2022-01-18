import { useRef, useMemo, useEffect, useState } from "react";
import { random } from "lodash-es";
import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import { colors } from "../../constants/colors";

const Outer = withFrame(Inner);

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

function Inner(props) {
  return (
    <>
      <Light />
      <group position={[0, -3.5, 0]}>
        <Spheres f={props.f} />
      </group>
    </>
  );
}

function Light() {
  return (
    <>
      <fog attach="fog" args={["white", 0, 40]} />
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow={true}
        position={[2.5, 8, 5]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />
    </>
  );
}

function Sphere({ position = [0, 0, 0], ...props }) {
  const [color, setColor] = useState(0);
  const [roughness, setRoughness] = useState(0);
  const ref = useRef();
  const factor = useMemo(() => 0.5 + Math.random(), []);

  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)]);

    setRoughness(random(0.3, 0.8));
  }, []);

  return (
    <mesh
      ref={ref}
      position={[
        position[0],
        position[1] + easeInOutCubic((1 + Math.sin(props.f * factor)) / 2) * 4,
        position[2],
      ]}
      {...props}
      castShadow={true}
      receiveShadow={true}
    >
      <sphereBufferGeometry attach="geometry" args={[0.2, 32, 32]} />
      <meshStandardMaterial
        attach="material"
        color={color}
        roughness={roughness}
        metalness={0.2}
      />
    </mesh>
  );
}

function Spheres({ number = 300, ...props }) {
  const ref = useRef();
  const positions = useMemo(
    () =>
      [...new Array(number)].map(() => [
        -2 * Math.random() * 4,
        Math.random() * 15,
        Math.random() * 10,
      ]),
    [number]
  );
  return (
    <group ref={ref}>
      {positions.map((pos, index) => (
        <Sphere f={props.f} key={index} position={pos} />
      ))}
    </group>
  );
}

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      gl={{ antialias: true }}
      camera={{ position: [-5, 10, 10], fov: 40 }}
    >
      <color attach="background" args={["beige"]} />
      <Outer next={props.next} />
    </Canvas>
  );
}
