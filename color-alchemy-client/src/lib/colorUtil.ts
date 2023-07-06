import { ColorDirection } from "./types";

export const toRGB = (rgb: number[]) => {
  return "rgb(" + rgb.join(",") + ")";
};
export const getTileColor = (
  sourcePosition: number[],
  color: number[],
  [j, colIndex]: number[],
  direction: ColorDirection,
  height: number,
  width: number
) => {
  const distance = calDistance(sourcePosition, [j, colIndex]);
  return calTileColor(color, distance, direction, height, width);
};

export const getMixedTileColor = (
  tileColor: number[],
  newTileColor: number[]
) => {
  const rgb1 = tileColor;
  const rgb2 = newTileColor;

  let r = 0;
  let g = 0;
  let b = 0;
  let f = 0;

  r = rgb1[0] + rgb2[0];
  g = rgb1[1] + rgb2[1];
  b = rgb1[2] + rgb2[2];

  f = 255 / Math.max(r, g, b, 255);
  return [r * f, g * f, b * f];
};

export const getRemovedTileColor = (
  originalTileColor: number[],
  tileColor: number[]
) => {
  const rgb1 = tileColor;
  const rgb2 = originalTileColor;

  let r = 0;
  let g = 0;
  let b = 0;
  let f = 0;

  r = rgb1[0] - rgb2[0];
  g = rgb1[1] - rgb2[1];
  b = rgb1[2] - rgb2[2];

  f = 255 / Math.max(r, g, b, 255);
  return [r * f, g * f, b * f];
};

export const calDistance = (point1: number[], point2: number[]) => {
  // https://www.calculator.net/distance-calculator.html
  const [x1, y1] = point1;
  const [x2, y2] = point2;

  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

export const calTileColor = (
  color: number[],
  distance: number,
  direction: ColorDirection,
  height: number,
  width: number
) => {
  let matric = direction === ColorDirection.UP_DOWN ? height : width;
  let newColor: number[] = [];
  color.forEach((rgbValue) => {
    const newnewColor = (rgbValue * (matric + 1 - distance)) / (matric + 1);
    newColor.push(newnewColor);
  });
  return newColor;
};

export const calDifference = (color1: number[], color2: number[]) => {
  const r = color1[0] - color2[0];
  const g = color1[1] - color2[1];
  const b = color1[2] - color2[2];

  return Number(
    (
      (1 / 255) *
      (1 / Math.sqrt(3)) *
      Math.sqrt(r ** 2 + g ** 2 + b ** 2) *
      100
    ).toFixed(2)
  );
};
