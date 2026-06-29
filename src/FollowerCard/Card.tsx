import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { Counter } from "./Counter";

interface CardProps {
  name: string;
  handle: string;
  avatarEmoji: string;
  followers: number;
  following: number;
  posts: number;
}

const ACCENT_A = "#a855f7";
const ACCENT_B = "#06b6d4";

const StatColumn: React.FC<{
  label: string;
  value: number;
  counterStart: number;
  counterEnd: number;
  slideStart: number;
}> = ({ label, value, counterStart, counterEnd, slideStart }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: Math.max(0, frame - slideStart),
    fps,
    config: { damping: 20, stiffness: 150 },
  });
  const translateY = interpolate(enter, [0, 1], [24, 0]);
  const opacity = interpolate(frame, [slideStart, slideStart + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        textAlign: "center",
        transform: `translateY(${translateY}px)`,
        opacity,
        minWidth: 200,
      }}
    >
      <div
        style={{
          fontSize: 70,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          background: `linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.82) 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        <Counter
          target={value}
          startFrame={counterStart}
          endFrame={counterEnd}
        />
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.42)",
          marginTop: 10,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {label}
      </div>
    </div>
  );
};

const StatDivider: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        width: 1,
        height: 72,
        background:
          "linear-gradient(180deg, transparent, rgba(255,255,255,0.18), transparent)",
        opacity,
        alignSelf: "center",
      }}
    />
  );
};

export const Card: React.FC<CardProps> = ({
  name,
  handle,
  avatarEmoji,
  followers,
  following,
  posts,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Card entrance ────────────────────────────────────────────────────────
  const cardSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 22, mass: 0.85, stiffness: 110 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [90, 0]);
  const cardOpacity = interpolate(frame, [10, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle idle float once card has settled
  const idleY = frame > 135 ? Math.sin((frame - 135) * 0.038) * 5 : 0;

  // ── Avatar ───────────────────────────────────────────────────────────────
  const avatarSpring = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { damping: 12, stiffness: 220 },
  });

  // Avatar ring pulse at completion (around frame 50 when spring settles)
  const ringGlow = interpolate(frame, [45, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Name ─────────────────────────────────────────────────────────────────
  const nameSpring = spring({
    frame: Math.max(0, frame - 36),
    fps,
    config: { damping: 22, stiffness: 160 },
  });
  const nameY = interpolate(nameSpring, [0, 1], [28, 0]);
  const nameOpacity = interpolate(frame, [36, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Handle ───────────────────────────────────────────────────────────────
  const handleOpacity = interpolate(frame, [46, 64], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Divider ──────────────────────────────────────────────────────────────
  const dividerScaleX = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // ── Follower label fade ───────────────────────────────────────────────────
  const followerLabelOpacity = interpolate(frame, [64, 76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Follower count completion glow ────────────────────────────────────────
  const countGlow = interpolate(frame, [156, 168], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // ── CTA button ───────────────────────────────────────────────────────────
  const btnSpring = spring({
    frame: Math.max(0, frame - 102),
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  // Button shimmer pass (frames 112–136)
  const shimmerX = interpolate(frame, [112, 136], [-320, 1080], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <div
      style={{
        transform: `translateY(${cardY + idleY}px)`,
        opacity: cardOpacity,
        width: 860,
        borderRadius: 44,
        padding: "68px 64px 64px",
        background: "rgba(255,255,255,0.065)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: "1px solid rgba(255,255,255,0.13)",
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.22)",
          "inset 0 0 0 1px rgba(168,85,247,0.14)",
          "0 32px 80px rgba(0,0,0,0.55)",
          "0 0 100px rgba(168,85,247,0.10)",
        ].join(", "),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ── Avatar ─────────────────────────────────────────────────────── */}
      <div
        style={{
          transform: `scale(${avatarSpring})`,
          marginBottom: 36,
          position: "relative",
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            background: `conic-gradient(from 0deg, ${ACCENT_A}, ${ACCENT_B}, #ec4899, ${ACCENT_A})`,
            opacity: ringGlow * 0.5,
            filter: "blur(12px)",
          }}
        />
        {/* Gradient border ring */}
        <div
          style={{
            width: 168,
            height: 168,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${ACCENT_A}, ${ACCENT_B})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 3,
            position: "relative",
            boxShadow: `0 0 ${28 + ringGlow * 24}px rgba(168,85,247,${0.35 + ringGlow * 0.3})`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1c0a38 0%, #091c38 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 70,
            }}
          >
            {avatarEmoji}
          </div>
        </div>
        {/* Verified badge */}
        <div
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${ACCENT_A}, ${ACCENT_B})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid #0e071e",
            fontSize: 20,
            color: "#fff",
            fontWeight: 700,
          }}
        >
          ✓
        </div>
      </div>

      {/* ── Name ───────────────────────────────────────────────────────── */}
      <div
        style={{
          transform: `translateY(${nameY}px)`,
          opacity: nameOpacity,
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 66,
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "#ffffff",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          {name}
        </h1>
      </div>

      {/* ── Handle ─────────────────────────────────────────────────────── */}
      <div
        style={{
          opacity: handleOpacity,
          marginBottom: 52,
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 32,
            letterSpacing: "0.07em",
            color: "rgba(255,255,255,0.48)",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          {handle}
        </p>
      </div>

      {/* ── Divider ────────────────────────────────────────────────────── */}
      <div
        style={{
          width: "100%",
          height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${ACCENT_A}99 30%, ${ACCENT_B}99 70%, transparent 100%)`,
          transform: `scaleX(${dividerScaleX})`,
          transformOrigin: "center",
          marginBottom: 52,
        }}
      />

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: 60,
        }}
      >
        {/* Followers — hero stat */}
        <div style={{ textAlign: "center", minWidth: 200 }}>
          <div
            style={{
              opacity: followerLabelOpacity,
              fontSize: 70,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              background: `linear-gradient(135deg, ${ACCENT_A} 0%, ${ACCENT_B} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: `drop-shadow(0 0 ${countGlow * 16}px ${ACCENT_A}cc)`,
            }}
          >
            <Counter
              target={followers}
              startFrame={66}
              endFrame={156}
            />
          </div>
          <div
            style={{
              opacity: followerLabelOpacity,
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.42)",
              marginTop: 10,
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Followers
          </div>
        </div>

        <StatDivider delay={78} />

        <StatColumn
          label="Following"
          value={following}
          counterStart={82}
          counterEnd={148}
          slideStart={80}
        />

        <StatDivider delay={92} />

        <StatColumn
          label="Posts"
          value={posts}
          counterStart={96}
          counterEnd={152}
          slideStart={94}
        />
      </div>

      {/* ── CTA Button ─────────────────────────────────────────────────── */}
      <div
        style={{
          width: "100%",
          transform: `scale(${btnSpring})`,
          position: "relative",
          overflow: "hidden",
          borderRadius: 26,
        }}
      >
        <div
          style={{
            width: "100%",
            height: 92,
            borderRadius: 26,
            background: `linear-gradient(135deg, ${ACCENT_A} 0%, #7c3aed 45%, ${ACCENT_B} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 38,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.04em",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            boxShadow: `0 10px 36px rgba(168,85,247,0.45), 0 2px 8px rgba(0,0,0,0.35)`,
          }}
        >
          Follow
        </div>
        {/* Shimmer sweep */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 220,
            left: shimmerX,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)",
            pointerEvents: "none",
            transform: "skewX(-12deg)",
          }}
        />
      </div>
    </div>
  );
};
