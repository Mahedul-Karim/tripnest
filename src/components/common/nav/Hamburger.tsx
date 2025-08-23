import React, { Dispatch, SetStateAction } from "react";
import styles from "./Hamburger.module.css";

const Hamburger = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      aria-label="Toggle Menu"
      className={`${styles.toggle} ${open ? styles.active : ""}`}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className={`${styles.bars} ${styles.bar1}`}></div>
      <div className={`${styles.bars} ${styles.bar2}`}></div>
      <div className={`${styles.bars} ${styles.bar3}`}></div>
    </button>
  );
};

export default Hamburger;
