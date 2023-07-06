import { GameTileTypes } from "./types";
import CGameTile from "./CGameTile";

const initGameTiles = (height: number, width: number) => {
  const sourceRows = 2;
  const sourceCols = 2;

  const rows = height + sourceRows;
  const cols = width + sourceCols;

  let newGameTiles: CGameTile[][] = [];

  for (let i = 0; i < rows; i++) {
    newGameTiles[i] = [];
    for (let j = 0; j < cols; j++) {
      if (ifSourcePosition(i, j, rows, cols)) {
        newGameTiles[i][j] = new CGameTile(GameTileTypes.SOURCE, [i, j]);
      } else {
        newGameTiles[i][j] = new CGameTile(GameTileTypes.TILE, [i, j]);
      }
    }
  }

  newGameTiles[0].shift();
  newGameTiles[0].pop();

  newGameTiles[rows - 1].shift();
  newGameTiles[rows - 1].pop();

  return newGameTiles;
};

const ifSourcePosition = (
  rowIndex: number,
  colIndex: number,
  rows: number,
  cols: number
) => {
  return (
    rowIndex === 0 ||
    rowIndex === rows - 1 ||
    colIndex === 0 ||
    colIndex === cols - 1
  );
};

export default initGameTiles;
