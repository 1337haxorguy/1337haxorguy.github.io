import React from "react";
import styles from "./Over.module.css";

export const GameOver = ({ winner }) => {
  return (
    <div className={styles.container}>
      <h1>Player <span className={styles.winner}>{winner.playerNumber}</span> is the winner!</h1>
    </div>
  );
};

