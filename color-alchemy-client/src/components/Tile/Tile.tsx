import { FC } from "react";
import { useDrag } from "react-dnd";
import { toRGB } from "../../lib/colorUtil";
import { DragTypes } from "../../lib/types";

import styles from "./Tile.module.css";

type TileProps = {
  bgColor: number[];
  active: boolean;
};

const Tile: FC<TileProps> = ({ bgColor, active }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragTypes.TILE,
      item: {
        tileColor: bgColor,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [bgColor]
  );

  const activeStyle = active ? styles["tile--active"] : "";
  return (
    <div
      ref={drag}
      className={` ${activeStyle} ${styles.tile}`}
      style={{ backgroundColor: `${toRGB(bgColor)}` }}
    ></div>
  );
};

export default Tile;
