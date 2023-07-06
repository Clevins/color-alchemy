import { FC } from "react";
import { useDrop } from "react-dnd";
import { toRGB } from "../../lib/colorUtil";
import { DragTypes } from "../../lib/types";

import styles from "./Source.module.css";

type SourceProps = {
  bgColor: number[];
  sourceClickHandler: any;
  position?: number[];
  hasDisplayPointer: boolean;
};

const Source: FC<SourceProps> = ({
  bgColor,
  position,
  sourceClickHandler,
  hasDisplayPointer,
}) => {
  const [collectedProps, drop] = useDrop(
    () => ({
      accept: DragTypes.TILE,
      drop: (item: any) => {
        sourceClickHandler(position, item.tileColor);
      },
    }),
    [position]
  );

  const pointerStyle = !hasDisplayPointer ? styles.source__pointer : "";

  return (
    <div
      ref={drop}
      onClick={(e) => sourceClickHandler(position)}
      className={` ${pointerStyle} ${styles.source}`}
      style={{ backgroundColor: `${toRGB(bgColor)}` }}
    ></div>
  );
};

export default Source;
