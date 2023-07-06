import { FC } from "react";
import CGameTile from "../../lib/CGameTile";
import { GameTileTypes } from "../../lib/types";

import Source from "../Source";
import Tile from "../Tile";

import styles from "./GameBoard.module.css";

type GameBoardProps = {
  gameTiles: CGameTile[][];
  onUpdateGameTiles: Function;
  sourceClicksComplete: boolean;
};

const GameBoard: FC<GameBoardProps> = ({
  gameTiles,
  onUpdateGameTiles,
  sourceClicksComplete,
}) => {
  const sourceClickHandler = (position: number[], droppedColor: number[]) => {
    onUpdateGameTiles(position, droppedColor);
  };
  return (
    <div>
      <div className={styles.grids}>
        {gameTiles.map((row, index) => (
          <div className={styles.row} key={`${row[index].position}`}>
            {row.map((gameTile) => (
              <div
                title={`${gameTile.rgba}`}
                id={`${gameTile.position}`}
                key={`${gameTile.position}`}
              >
                {gameTile.type === GameTileTypes.SOURCE ? (
                  <Source
                    bgColor={gameTile.rgba}
                    position={gameTile.position}
                    hasDisplayPointer={sourceClicksComplete}
                    sourceClickHandler={(
                      position: number[],
                      droppedColor: number[]
                    ) => sourceClickHandler(position, droppedColor)}
                  ></Source>
                ) : (
                  <Tile bgColor={gameTile.rgba} active={gameTile.active}></Tile>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
