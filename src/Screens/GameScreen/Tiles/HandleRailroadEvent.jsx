import styles from "./Tile.module.css";
import Button from "react-bootstrap/Button";

export const HandleRailroadEvent = ({
  currentTile,
  currentPlayer,
  updatePlayerPositions,
  playerPositions,
  handlePayment,
  handleRailroadClick,
  landOnMandatorySpace,
}) => {


  // Ensure that currentTile and currentTile.data are defined
  if (currentTile.type === "Railroad" && currentTile.data) {
    if (currentTile.data.owner === "NA") {
      if (currentPlayer.cash > currentTile.data.purchaseCost) {
        return (
          <div className={styles.GameEvents}>
            <h5>
              Would you like to purchase {currentTile.data.name} for ₩
              {currentTile.data.purchaseCost}?
            </h5>
            <Button variant="outline-success" onClick={handleRailroadClick}>
              Purchase
            </Button>
          </div>
        );
      }
    } else {
      if (currentPlayer != playerPositions[currentTile.data.owner - 1].Player) {
        landOnMandatorySpace();
        return (
          <div className={styles.GameEvents}>
            <h5>
              You must pay ₩{currentTile.data.rent[currentTile.data.index]} to
              Player{" "}
              {playerPositions[currentTile.data.owner - 1].Player.playerNumber}
            </h5>
            <Button variant="outline-success" onClick={handlePayment}>
              Pay ₩{currentTile.data.rent[currentTile.data.index]}
            </Button>
          </div>
        );
      }
    }
  }
  // Return null or some default content if the conditions are not met.
  return null;
};
