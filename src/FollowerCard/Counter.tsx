import { useCurrentFrame, interpolate, Easing } from "remotion";

const formatNumber = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

interface CounterProps {
  target: number;
  startFrame: number;
  endFrame: number;
}

export const Counter: React.FC<CounterProps> = ({
  target,
  startFrame,
  endFrame,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return <>{formatNumber(progress * target)}</>;
};
