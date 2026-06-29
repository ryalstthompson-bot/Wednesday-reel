import "./index.css";
import { Composition } from "remotion";
import type { ComponentType } from "react";
import { MyComposition } from "./Composition";
import { FollowerCard } from "./FollowerCard";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WednesdayReel"
        component={MyComposition}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FollowerCard"
        component={FollowerCard as unknown as ComponentType<Record<string, unknown>>}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          name: "Wednesday",
          handle: "@wednesday.tv",
          avatarEmoji: "🎬",
          followers: 127400,
          following: 842,
          posts: 312,
        }}
      />
    </>
  );
};
