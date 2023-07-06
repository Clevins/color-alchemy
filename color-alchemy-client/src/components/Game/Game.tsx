import { FC, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import initGameTiles from "../../lib/initGameTiles";
import { ColorDirection, Response } from "../../lib/types";
// import CSource from "../../lib/CSource";
// import CTile from "../../lib/CTile";
// import CGameTile from "../../lib/CTile";
import {
  calDifference,
  getMixedTileColor,
  getRemovedTileColor,
  getTileColor,
} from "../../lib/colorUtil";

import GameBoard from "../GameBoard";
import GameScore from "../GameScore";
import Modal from "../Modal";

import styles from "./Game.module.css";
import CGameTile from "../../lib/CGameTile";

type GameProps = {
  data: Response;
};

const Game: FC<GameProps> = ({ data }) => {
  const { userId, width, height, maxMoves, target } = data;

  const sourceRows = 2;
  const sourceCols = 2;
  const defaultColor = [0, 0, 0];

  const [rows] = useState(height + sourceRows);
  const [cols] = useState(width + sourceCols);
  const [gameTiles, setGameTiles] = useState<CGameTile[][]>(
    initGameTiles(height, width)
  );

  const [finishedRedMove, setFinishedRedMove] = useState(false);
  const [finishedGreenMove, setFinishedGreenMove] = useState(false);
  const [finishedBlueMove, setFinishedBlueMove] = useState(false);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [resultMsg, setResultMsg] = useState<string>("");

  const [movesLeft, setMovesLeft] = useState<number>(maxMoves);
  const [difference, setDifference] = useState<number>(
    calDifference(defaultColor, target)
  );
  const [activeTile, setActiveTile] = useState<CGameTile>(new CGameTile());

  useEffect(() => {
    checkForWin();
  }, [movesLeft]);

  const ifTopOrBottomRow = (rowIndex: number, rows: number) => {
    return rowIndex === 0 || rowIndex === rows - 1;
  };

  const ifTileIsBlack = (tileColor: number[]) => {
    return tileColor.join("") === "000";
  };

  const updateGameTiles = (
    sourcePosition: number[],
    droppedColor: number[]
  ) => {
    let newGameTiles: CGameTile[][] = [];

    const RED = [255, 0, 0];
    const GREEN = [0, 255, 0];
    const BLUE = [0, 0, 255];

    if (droppedColor) {
      newGameTiles = getUpdatedTilesColor(sourcePosition, droppedColor);
    } else if (!finishedRedMove) {
      setFinishedRedMove(true);
      newGameTiles = getUpdatedTilesColor(sourcePosition, RED);
    } else if (!finishedGreenMove) {
      setFinishedGreenMove(true);
      newGameTiles = getUpdatedTilesColor(sourcePosition, GREEN);
    } else if (!finishedBlueMove) {
      setFinishedBlueMove(true);
      newGameTiles = getUpdatedTilesColor(sourcePosition, BLUE);
    } else {
      return;
    }

    checkForDifference(newGameTiles);

    setGameTiles(newGameTiles);

    setMovesLeft((movesLeft) => {
      movesLeft--;
      return movesLeft;
    });
  };

  const checkForDifference = (newGameTiles: CGameTile[][]) => {
    if (newGameTiles.length <= 0) {
      return;
    }
    let maxDiff = 100;

    for (let i = 1; i < rows - 1; i++) {
      for (let j = 1; j < cols - 1; j++) {
        const tileColor = newGameTiles[i][j].rgba;
        const newDiff = calDifference(tileColor, target);
        if (newDiff < maxDiff) {
          maxDiff = newDiff;
          setDifference(newDiff);
          setActiveTile((activeTile: CGameTile) => {
            if (activeTile.position) {
              const [tileRowIndex, tileColIndex] = activeTile.position;
              newGameTiles[tileRowIndex][tileColIndex].active = false;
            }
            newGameTiles[i][j].active = true;
            return newGameTiles[i][j];
          });
        }
      }
    }
  };

  const checkForWin = () => {
    if (difference <= 10) {
      setModalOpen(true);
      setResultMsg("Winner!!!");
      return;
    }
    if (movesLeft <= 0) {
      setModalOpen(true);
      setResultMsg("Loser!!");
      return;
    }
  };

  const getUpdatedTilesColor = (sourcePosition: number[], color: number[]) => {
    let [rowIndex, colIndex] = sourcePosition;

    let newGameTiles = [...gameTiles];

    if (rowIndex === 0) {
      for (let j = 1; j < height; j++) {
        const tileIndex = [j, colIndex];

        newGameTiles = getUpdatedRowsCols(
          sourcePosition,
          color,
          tileIndex,
          ColorDirection.UP_DOWN
        );
      }
    } else if (rowIndex === rows - 1) {
      for (let j = height; j > 0; j--) {
        const tileIndex = [j, colIndex];

        newGameTiles = getUpdatedRowsCols(
          sourcePosition,
          color,
          tileIndex,
          ColorDirection.UP_DOWN
        );
      }
    } else if (colIndex === 0) {
      for (let j = 1; j <= width; j++) {
        const tileIndex = [rowIndex, j];

        newGameTiles = getUpdatedRowsCols(
          sourcePosition,
          color,
          tileIndex,
          ColorDirection.LEFT_RIGHT
        );
      }
    } else if (colIndex === cols - 1) {
      for (let j = width; j >= 0; j--) {
        const tileIndex = [rowIndex, j];

        newGameTiles = getUpdatedRowsCols(
          sourcePosition,
          color,
          tileIndex,
          ColorDirection.LEFT_RIGHT
        );
      }
    }

    // Set Source Color and Active
    if (ifTopOrBottomRow(rowIndex, rows)) {
      newGameTiles[rowIndex][colIndex - 1].rgba = color;
      newGameTiles[rowIndex][colIndex - 1].active = true;
    } else {
      newGameTiles[rowIndex][colIndex].rgba = color;
      newGameTiles[rowIndex][colIndex].active = true;
    }

    return newGameTiles;
  };

  const getUpdatedRowsCols = (
    sourcePosition: number[],
    color: number[],
    tilePosition: number[],
    direction: ColorDirection
  ) => {
    let newGameTiles = [...gameTiles];

    let [rowIndex, colIndex] = sourcePosition;
    let [tileRowIndex, tileColIndex] = tilePosition;

    if (ifTopOrBottomRow(rowIndex, rows)) colIndex = colIndex - 1;

    const sourceColor = newGameTiles[rowIndex][colIndex].rgba;
    const tileColor = newGameTiles[tileRowIndex][tileColIndex].rgba;
    const isSourceActive = newGameTiles[rowIndex][colIndex].active;

    const newTileColor = getTileColor(
      sourcePosition,
      color,
      [tileRowIndex, tileColIndex],
      direction,
      height,
      width
    );

    if (ifTileIsBlack(tileColor)) {
      newGameTiles[tileRowIndex][tileColIndex].rgba = newTileColor;
    } else if (isSourceActive) {
      const originalTileColor = getTileColor(
        sourcePosition,
        sourceColor,
        [tileRowIndex, tileColIndex],
        direction,
        height,
        width
      );

      const removedColor = getRemovedTileColor(originalTileColor, tileColor);

      newGameTiles[tileRowIndex][tileColIndex].rgba = getMixedTileColor(
        newTileColor,
        removedColor
      );
    } else {
      newGameTiles[tileRowIndex][tileColIndex].rgba = getMixedTileColor(
        tileColor,
        newTileColor
      );
    }

    return newGameTiles;
  };

  return (
    <>
      <Modal isOpen={modalOpen} message={resultMsg} userId={userId} />
      <div className={styles.game}>
        <h3>RGB Alchemy</h3>
        <GameScore
          userId={userId}
          target={target}
          movesLeft={movesLeft}
          activeTile={activeTile}
          difference={difference}
        ></GameScore>

        <DndProvider backend={HTML5Backend}>
          <GameBoard
            onUpdateGameTiles={(position: number[], droppedColor: number[]) =>
              updateGameTiles(position, droppedColor)
            }
            sourceClicksComplete={
              finishedRedMove && finishedGreenMove && finishedBlueMove
            }
            gameTiles={gameTiles}
          ></GameBoard>
        </DndProvider>
      </div>
    </>
  );
};

export default Game;
