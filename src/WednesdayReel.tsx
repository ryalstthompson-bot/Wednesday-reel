import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from 'remotion';

// Timing (frames at 30fps — total 600 = 20s)
const OPENING_FADE_IN: readonly [number, number] = [0, 25];
const CUT_TO_FOOTAGE = 90;
const CAPTION_FADE: readonly [number, number] = [150, 185];
const FOOTAGE_FADE_OUT: readonly [number, number] = [480, 545];
const FINAL_FADE_IN: readonly [number, number] = [548, 570];

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};
const easeOut = { ...clamp, easing: Easing.out(Easing.cubic) };

const BokehLight: React.FC<{
  frame: number;
  x: number;
  y: number;
  size: number;
  driftY: number;
  opacity: number;
}> = ({ frame, x, y, size, driftY, opacity }) => {
  const top = interpolate(frame, [CUT_TO_FOOTAGE, 545], [y, y + driftY], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${top}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(255,210,110,0.9) 0%, rgba(255,160,50,0.2) 50%, transparent 70%)',
        filter: `blur(${Math.round(size * 0.38)}px)`,
        opacity,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

const WarmMorningBg: React.FC<{ frame: number }> = ({ frame }) => {
  const lightX = interpolate(frame, [CUT_TO_FOOTAGE, 545], [16, 28], clamp);
  const lightY = interpolate(frame, [CUT_TO_FOOTAGE, 545], [10, 22], clamp);
  const accentX = interpolate(frame, [CUT_TO_FOOTAGE, 545], [78, 65], clamp);

  return (
    <>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${lightX}% ${lightY}%, #fad298 0%, #e89a60 22%, #c06838 48%, #662a14 74%, #180906 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${accentX}% 82%, rgba(255,150,50,0.22) 0%, transparent 52%)`,
          mixBlendMode: 'screen',
        }}
      />
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <BokehLight frame={frame} x={20} y={15} size={90}  driftY={-10} opacity={0.55} />
        <BokehLight frame={frame} x={70} y={32} size={60}  driftY={-6}  opacity={0.40} />
        <BokehLight frame={frame} x={42} y={58} size={110} driftY={-12} opacity={0.28} />
        <BokehLight frame={frame} x={82} y={18} size={48}  driftY={-7}  opacity={0.48} />
        <BokehLight frame={frame} x={12} y={72} size={70}  driftY={-5}  opacity={0.32} />
      </AbsoluteFill>
      {/* Bottom gradient so caption text is readable */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.42) 28%, transparent 52%)',
        }}
      />
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 38%, transparent 32%, rgba(0,0,0,0.58) 100%)',
        }}
      />
    </>
  );
};

export const WednesdayReel: React.FC = () => {
  const frame = useCurrentFrame();

  const openingOpacity = interpolate(frame, OPENING_FADE_IN, [0, 1], easeOut);

  const footageOpacity =
    frame >= CUT_TO_FOOTAGE
      ? interpolate(frame, FOOTAGE_FADE_OUT, [1, 0], clamp)
      : 0;

  const captionOpacity =
    frame >= CAPTION_FADE[0]
      ? interpolate(frame, CAPTION_FADE, [0, 1], easeOut)
      : 0;

  const finalOpacity =
    frame >= FINAL_FADE_IN[0]
      ? interpolate(frame, FINAL_FADE_IN, [0, 1], easeOut)
      : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0804', overflow: 'hidden' }}>

      {/* Opening text */}
      {frame < CUT_TO_FOOTAGE && (
        <AbsoluteFill
          style={{
            opacity: openingOpacity,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          <p
            style={{
              color: '#ffffff',
              fontSize: '82px',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: 1.2,
              letterSpacing: '-1px',
              margin: 0,
            }}
          >
            Success isn't filmed.
            <br />
            It's repeated.
          </p>
        </AbsoluteFill>
      )}

      {/* Warm morning footage */}
      {frame >= CUT_TO_FOOTAGE && (
        <AbsoluteFill style={{ opacity: footageOpacity }}>
          <WarmMorningBg frame={frame} />

          {/* Caption */}
          <AbsoluteFill
            style={{
              opacity: captionOpacity,
              display: 'flex',
              alignItems: 'flex-end',
              padding: '0 64px 140px',
            }}
          >
            <p
              style={{
                color: '#ffffff',
                fontSize: '40px',
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 400,
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              What's behind this is boring repetition, not a highlight reel.{' '}
              Are you in love with the result, or willing to love the process?
            </p>
          </AbsoluteFill>
        </AbsoluteFill>
      )}

      {/* Final text */}
      {frame >= FINAL_FADE_IN[0] && (
        <AbsoluteFill
          style={{
            opacity: finalOpacity,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          <p
            style={{
              color: '#ffffff',
              fontSize: '62px',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            Drop a 🔥 if you're doing the unglamorous work today.
          </p>
        </AbsoluteFill>
      )}

    </AbsoluteFill>
  );
};
