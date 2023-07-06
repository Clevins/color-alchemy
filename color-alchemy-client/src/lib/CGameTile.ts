import { GameTileTypes } from "./types";

export default class CGameTile {
  rgba: number[];
  active: boolean;
  position?: number[];
  type?: GameTileTypes;

  constructor(type?: GameTileTypes, position?: number[]) {
    this.rgba = [0, 0, 0];
    this.active = false;
    this.position = position;
    this.type = type;
  }
}
