import { useState, Suspense } from "react";
import { useCurrentFrame } from "remotion";
import { useFrame } from "@react-three/fiber";

export const withFrame =
  (Component) =>
  // eslint-disable-next-line react/display-name
  ({ ...props }) => {
    let currentFrame;
    const [frame, setFrame] = useState(0);

    if (!props.next) {
      currentFrame = useCurrentFrame();
    } else {
      useFrame(({ clock }) => {
        setFrame(clock.getElapsedTime() * 30);
      });
    }

    let f = !props.next ? currentFrame : frame;

    return props.next ? (
      <Suspense fallback={null}>
        <Component {...props} f={f} />
      </Suspense>
    ) : (
      <Component {...props} f={f} />
    );
  };
