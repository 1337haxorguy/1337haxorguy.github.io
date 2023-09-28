import styles from "./Tile.module.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { chanceCards } from "./RandomCards";

export const HandleCommunityChestEvent = ({
  currentTile,
  currentPlayer,
  playerPositions,
  landOnMandatorySpace,
  updatePlayerPositions,
  handleChance
}) => {

    const [communityChestClicked, setCommunityChestClicked] = useState(false);
    const [communityChestDescription, setCommunityChestDescription] = useState(null);

    const handleCommunityChestClick = (Player) => {
        const randomIndex = Math.floor(Math.random() * chanceCards.length);
        const selectedCard = chanceCards[randomIndex];
        
        selectedCard.action(currentPlayer, playerPositions);
        console.log(playerPositions, selectedCard.description)
    
    
        updatePlayerPositions([...playerPositions]);
        setCommunityChestDescription(selectedCard.description);
        setCommunityChestClicked(true);
    
    
      };
    
  landOnMandatorySpace();

  if (currentTile.type === "CommunityChest") {
    if (communityChestClicked === false) {
        return (
            <div className={styles.GameEvents}>
              <h5>You must draw a Community Chest Card:</h5>
              <Button
                variant="outline-success"
                onClick={() => handleCommunityChestClick(currentPlayer)}
              >
                Draw Card
              </Button>
            </div>
          );
    } 
    if (communityChestClicked === true) {
        handleChance()
        return (
            <h5 className={styles.GameEvents}>{communityChestDescription}</h5>
            
        );
    }

  }
  return null;
};
