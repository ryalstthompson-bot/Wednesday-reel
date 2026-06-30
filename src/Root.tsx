import './index.css';
import { Composition } from 'remotion';
import { WednesdayReel } from './WednesdayReel';
import { BRollWithText } from './BRollWithText';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WednesdayReel"
        component={WednesdayReel}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BRollWithText"
        component={BRollWithText}
        durationInFrames={513}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
