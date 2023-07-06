import { FC } from "react";

import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  message: string;
  userId: string;
};

const Modal: FC<ModalProps> = ({ isOpen, message, userId }) => {
  const onReplay = () => {
    localStorage.setItem("userId", JSON.stringify(userId));
    window.location.reload();
  };

  const onCancel = () => {
    localStorage.removeItem("userId");
    window.location.reload();
  };

  const isHiddenStyle = isOpen ? styles.model : styles["model--hidden"];

  return (
    <div className={`${isHiddenStyle}`}>
      <div className={styles.model__body}>
        <div className={styles.header}>{message}</div>
        <div className={styles.model__control}>
          <button onClick={() => onReplay()} className={`${styles.model__btn}`}>
            Play Again
          </button>
          <button className={`${styles.model__btn}`} onClick={() => onCancel()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
