import { AbsoluteFill } from "remotion";
import { Background } from "./Background";
import { Card } from "./Card";

export interface FollowerCardProps {
  name: string;
  handle: string;
  avatarEmoji: string;
  followers: number;
  following: number;
  posts: number;
}

export const FollowerCard: React.FC<FollowerCardProps> = (props) => {
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Card {...props} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
