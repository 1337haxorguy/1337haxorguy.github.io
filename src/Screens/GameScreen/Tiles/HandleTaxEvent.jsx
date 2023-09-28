import styles from "./Tile.module.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export const HandleTaxEvent = ({
  currentTile,
  currentPlayer,
  updatePlayerPositions,
  playerPositions,
  handleTaxClick,
  landOnMandatorySpace
}) => {


landOnMandatorySpace()



  if (currentTile.type === "Tax") {
      return (
        <div className={styles.GameEvents}>
          <h5>You are being taxed for ₩{currentTile.data.tax}</h5>
          <Button variant="outline-success" onClick={handleTaxClick}>
            Pay Taxes?
          </Button>
        </div>
      );
    
  }
  return null;
};
