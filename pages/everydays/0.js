import Canvas from "../../components/Canvas";
import { withFrame } from "../../hoc/withFrame";
import { interpolate } from "remotion";

const Outer = withFrame(Inner);

function Inner(props) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight args={[undefined, 0.4]} position={[200, 200, 0]} />
      <mesh
        position={[0, 0, 0]}
        rotation={[
          props.f * 0.06 * 0.5,
          props.f * 0.07 * 0.5,
          props.f * 0.08 * 0.5,
        ]}
        scale={interpolate(Math.sin(props.f / 10), [-1, 1], [0.8, 1.2])}
      >
        <boxGeometry args={[100, 100, 100]} />
        <meshStandardMaterial
          color={[
            Math.sin(props.f * 0.12) * 0.5 + 0.5,
            Math.cos(props.f * 0.11) * 0.5 + 0.5,
            Math.sin(props.f * 0.08) * 0.5 + 0.5,
          ]}
        />
      </mesh>
    </>
  );
}

export default function App(props) {
  return (
    <Canvas
      next={props.next}
      gl={{ antialias: true }}
      camera={{ fov: 75, position: [0, 0, 470] }}
    >
      <color attach="background" args={["beige"]} />
      <Outer next={props.next} />
    </Canvas>
  );
}
