import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const hookOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const ctaOpacity = interpolate(
    frame,
    [durationInFrames - fps * 3, durationInFrames - fps * 2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-black items-center justify-center">
      <div
        style={{ opacity: hookOpacity }}
        className="absolute top-32 px-8 text-center"
      >
        <p className="text-white text-4xl font-black uppercase tracking-tight leading-tight drop-shadow-lg">
          WATCH TILL THE END ⬇️
        </p>
      </div>

      <div className="text-white text-center px-8">
        <p className="text-2xl font-semibold opacity-40">Wednesday Reel</p>
        <p className="text-lg opacity-25 mt-2">Drop your clip.mp4 into capcut/assets/</p>
      </div>

      <div
        style={{ opacity: ctaOpacity }}
        className="absolute bottom-32 px-8 text-center"
      >
        <p className="text-white text-3xl font-black drop-shadow-lg">
          Follow for more every Wednesday
        </p>
      </div>
    </AbsoluteFill>
  );
};
