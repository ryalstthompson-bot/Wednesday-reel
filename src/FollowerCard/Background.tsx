import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Orbs drift on slow sine paths — deterministic, frame-driven
  const o1x = Math.sin(frame * 0.015) * 60;
  const o1y = Math.cos(frame * 0.011) * 45;
  const o2x = Math.cos(frame * 0.009) * 55;
  const o2y = Math.sin(frame * 0.013) * 50;
  const o3x = Math.sin(frame * 0.007 + 1) * 50;
  const o3y = Math.cos(frame * 0.017 + 2) * 38;

  return (
    <AbsoluteFill style={{ opacity, overflow: "hidden" }}>
      {/* Base gradient */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(160deg, #0b0720 0%, #180b2e 45%, #0a1828 100%)",
        }}
      />

      {/* Purple orb — top-left */}
      <div
        style={{
          position: "absolute",
          width: 720,
          height: 720,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.38) 0%, transparent 68%)",
          top: 80 + o1y,
          left: -130 + o1x,
          filter: "blur(48px)",
        }}
      />

      {/* Cyan orb — bottom-right */}
      <div
        style={{
          position: "absolute",
          width: 640,
          height: 640,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.32) 0%, transparent 68%)",
          bottom: 60 + o2y,
          right: -100 + o2x,
          filter: "blur(48px)",
        }}
      />

      {/* Pink orb — upper-right */}
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.22) 0%, transparent 68%)",
          top: 220 + o3y,
          right: -60 + o3x,
          filter: "blur(40px)",
        }}
      />

      {/* Warm violet orb — lower-left */}
      <div
        style={{
          position: "absolute",
          width: 580,
          height: 580,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 68%)",
          bottom: 350 - o1y * 0.5,
          left: 80 + o2x * 0.4,
          filter: "blur(44px)",
        }}
      />

      {/* Noise grain overlay for texture */}
      <AbsoluteFill
        style={{
          background:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
          opacity: 0.5,
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};
