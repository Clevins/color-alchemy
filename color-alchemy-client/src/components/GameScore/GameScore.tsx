import { FC } from "react";
import CGameTile from "../../lib/CGameTile";
import { toRGB } from "../../lib/colorUtil";

import styles from "./GameScore.module.css";

type GameScoreProps = {
  userId: string;
  target: number[];
  movesLeft: number;
  activeTile: CGameTile;
  difference: number;
};

const GameScore: FC<GameScoreProps> = ({
  userId,
  target,
  movesLeft,
  activeTile,
  difference,
}) => {
  return (
    <div className={styles.stats}>
      <p>UserID: {userId} </p>
      <p>Moves Left: {movesLeft} </p>
      <div className={` ${styles.target}`}>
        Target Color:
        <div
          title={`${target}`}
          className={` ${styles.tile}`}
          style={{ backgroundColor: `${toRGB(target)}` }}
        ></div>
      </div>
      <div className={` ${styles.target}`}>
        Closet Color:
        <div
          title={`${activeTile.rgba}`}
          className={` ${styles.tile}`}
          style={{ backgroundColor: `${toRGB(activeTile.rgba)}` }}
        ></div>
        Δ = {difference}%
      </div>
    </div>
  );
};

export default GameScore;
