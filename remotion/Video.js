import { Composition, getInputProps } from "remotion";
const { number } = getInputProps();

const props = {
  id: "Scene",
  lazyComponent: () => import(`../pages/everydays/${number}`),
  durationInFrames: 600,
  fps: 30,
  width: getInputProps()?.size ?? 2000,
  height: getInputProps()?.size ?? 2000,
  defaultProps: {
    videoSrc: "phone",
    baseScale: 2,
  },
};

export function Video() {
  return (
    <>
      <Composition {...props} />
    </>
  );
}
