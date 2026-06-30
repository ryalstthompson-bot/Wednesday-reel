import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from 'remotion';

const STEAM_START = 352; // kettle-pour shot begins (cut from empty mug, ~11.7 s)
const STEAM_END   = 387; // last frame before cut to lemon-slice shot (~12.9 s)

const FADE_OUT_FRAMES = 5; // ~0.17 s fade before the cut

const clamp = {
  extrapolateLeft:  'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const SteamText: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  // Scale punch: 130 % → 100 % with spring overshoot (slight dip below 100 % then settle)
  const progress = spring({
    frame: localFrame,
    fps,
    config: {
      mass:      0.3,
      stiffness: 320,
      damping:   12,
    },
  });
  // Intentionally no right-clamp so the spring overshoot translates into a
  // scale undershoot (brief dip to ~97 %) before snapping back to 100 %.
  const scale = interpolate(progress, [0, 1], [1.3, 1.0], {
    extrapolateLeft: 'clamp' as const,
  });

  // Opacity fade-out in the final FADE_OUT_FRAMES before the cut
  const globalFrame = localFrame + STEAM_START;
  const opacity = interpolate(
    globalFrame,
    [STEAM_END - FADE_OUT_FRAMES, STEAM_END],
    [1, 0],
    clamp,
  );

  return (
    <AbsoluteFill
      style={{
        display:        'flex',
        alignItems:     'flex-end',
        justifyContent: 'center',
        paddingBottom:  280,
      }}
    >
      <p
        style={{
          color:          '#ffffff',
          fontSize:       '76px',
          fontFamily:     '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontWeight:     700,
          textAlign:      'center',
          letterSpacing:  '-0.5px',
          margin:         0,
          opacity,
          transform:      `scale(${scale})`,
          transformOrigin: 'center center',
          textShadow: [
            '0 2px 12px rgba(0,0,0,0.80)',
            '0 1px  4px rgba(0,0,0,0.60)',
            '0 4px 24px rgba(0,0,0,0.40)',
          ].join(', '),
        }}
      >
        This counts too.
      </p>
    </AbsoluteFill>
  );
};

export const BRollWithText: React.FC = () => {
  const frame = useCurrentFrame();
  const inSteamShot = frame >= STEAM_START && frame <= STEAM_END;
  const localFrame  = frame - STEAM_START;

  return (
    <AbsoluteFill>
      <Video src={staticFile('broll.mp4')} />
      {inSteamShot && <SteamText localFrame={localFrame} />}
    </AbsoluteFill>
  );
};
