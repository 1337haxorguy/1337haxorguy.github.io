import styles from "./Tile.module.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { chanceCards } from "./RandomCards";

export const HandleChanceEvent = ({
  currentTile,
  currentPlayer,
  playerPositions,
  landOnMandatorySpace,
  updatePlayerPositions,
  handleChance
}) => {

    const [chanceCardClicked, setChanceCardClicked] = useState(false);
    const [chanceDescription, setChanceDescription] = useState(null);

    const handleChanceClick = () => {
        const randomIndex = Math.floor(Math.random() * chanceCards.length);
        const selectedCard = chanceCards[randomIndex];
        
        selectedCard.action(currentPlayer, playerPositions);    
    
        updatePlayerPositions([...playerPositions]);
        setChanceDescription(selectedCard.description);
        setChanceCardClicked(true);
    
    
      };
    
  landOnMandatorySpace();

  if (currentTile.type === "Chance") {
    if (chanceCardClicked === false) {
        return (
            <div className={styles.GameEvents}>
              <h5>You must draw a chance card:</h5>
              <Button
                variant="outline-success"
                onClick={() => handleChanceClick()}
              >
                Draw Card
              </Button>
            </div>
          );
    } 
    if (chanceCardClicked === true) {
        handleChance()
        return (
            <h5 className={styles.GameEvents}>{chanceDescription}</h5>
            
        );
    }

  }
  return null;
};
