export enum GameTileTypes {
  "SOURCE" = 1,
  "TILE",
}

export enum ColorDirection {
  "UP_DOWN" = 1,
  "LEFT_RIGHT",
}

export type Response = {
  userId: string;
  width: number;
  height: number;
  maxMoves: number;
  target: number[];
};

export const DragTypes = {
  TILE: "tile",
  SOURCE: "source",
};
