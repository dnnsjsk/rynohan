import { ThreeCanvas } from "@remotion/three";
import { Canvas as Canva, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Canvas(props) {
  const env = process.env.NODE_ENV;

  if (!props.next) {
    return (
      <ThreeCanvas width={2000} height={2000} orthographic={false} {...props}>
        {props.children}
      </ThreeCanvas>
    );
  } else {
    return (
      <Canva {...props}>
        {env === "development" && <Orbit />}
        {props.children}
      </Canva>
    );
  }
}

function Orbit() {
  const { camera } = useThree();

  function onChange() {
    console.log(camera);
  }

  return <OrbitControls onChange={onChange} />;
}
