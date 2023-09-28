import styles from "./Tile.module.css";
import { HandlePropertyEvent } from "./HandlePropertyEvent";
import { HandleUtilityEvent } from "./HandleUtilityEvent";
import { HandleTaxEvent } from "./HandleTaxEvent";
import { Tile } from "./Tile";
import { HandleRailroadEvent } from "./HandleRailroadEvent";
import { CompleteColorSets } from "../Properties";
import { HandleChanceEvent } from "./HandleChanceEvent";
import { chanceCards } from "./RandomCards";
import { HandleCommunityChestEvent } from "./HandleCommunityChestEvent";

export const GameBoard = ({
  playerPositions,
  Spaces,
  currentTile,
  setCurrentTile,
  currentPlayer,
  updatePlayerPositions,
  showEvent,
  setShowEvent,
  setShowEndTurn,
  showEndTurn,
}) => {
  const handlePayment = () => {
    console.log(currentTile.data.index);
    currentPlayer.cash =
      currentPlayer.cash - currentTile.data.rent[currentTile.data.index];
    playerPositions[currentTile.data.owner - 1].Player.cash =
      playerPositions[currentTile.data.owner - 1].Player.cash +
      currentTile.data.rent[currentTile.data.index];
    setShowEvent(false);
    setShowEndTurn(true);
  };

  const handleChance = () => {
    setShowEndTurn(true);
  };
  const increaseColorSetIndexes = (color, Player) => {
    Player.properties.forEach((property) => {
      if (property.color === color) {
        property.index += 1;
      }
    });
    // Update the state or properties array to reflect the changes
    // You may need to call setState or update the properties array here.
  };

  const handlePropertyClick = () => {
    currentPlayer.cash = currentPlayer.cash - currentTile.data.purchaseCost;
    currentTile.data.owner = currentPlayer.playerNumber; // Set the owner as the player number

    // Find the index of the current player in playerPositions
    const currentPlayerIndex = playerPositions.findIndex(
      (playerData) => playerData.Player === currentPlayer
    );

    if (currentPlayer.colorSet.has(currentTile.data.color)) {
      currentPlayer.colorSet.set(
        currentTile.data.color,
        currentPlayer.colorSet.get(currentTile.data.color) + 1
      );
    } else {
      currentPlayer.colorSet.set(currentTile.data.color, 1);
    }

    if (
      currentPlayer.colorSet.get(currentTile.data.color) ===
      CompleteColorSets.get(currentTile.data.color)
    ) {
      currentTile.data.index = currentTile.data.index + 1;
      increaseColorSetIndexes(currentTile.data.color, currentPlayer);
    }

    // Update the player's position and properties in playerPositions
    if (currentPlayerIndex !== -1) {
      playerPositions[currentPlayerIndex].position = currentTile.tileNum;
      playerPositions[currentPlayerIndex].Player.properties.push(
        currentTile.data
      );
      playerPositions[currentPlayerIndex].Player.colorSet =
        currentPlayer.colorSet;
    }

    // Call the callback to update playerPositions state
    updatePlayerPositions([...playerPositions]);
    setShowEvent(false);
  };

  const handleTaxClick = () => {
    currentPlayer.cash = currentPlayer.cash - currentTile.data.tax;

    const currentPlayerIndex = playerPositions.findIndex(
      (playerData) => playerData.Player === currentPlayer
    );

    if (currentPlayerIndex !== -1) {
      playerPositions[currentPlayerIndex].position = currentTile.tileNum;
    }

    updatePlayerPositions([...playerPositions]);
    setShowEndTurn(true);
    setShowEvent(false);
  };

  const handleUtilityClick = () => {
    currentPlayer.cash = currentPlayer.cash - currentTile.data.purchaseCost;
    currentTile.data.owner = currentPlayer.playerNumber; // Set the owner as the player number

    // Find the index of the current player in playerPositions
    const currentPlayerIndex = playerPositions.findIndex(
      (playerData) => playerData.Player === currentPlayer
    );

    // Update the player's position and properties in playerPositions
    if (currentPlayerIndex !== -1) {
      playerPositions[currentPlayerIndex].position = currentTile.tileNum;
      playerPositions[currentPlayerIndex].Player.utilities.push(
        currentTile.data
      );
    }

    // Call the callback to update playerPositions state
    updatePlayerPositions([...playerPositions]);
    setShowEvent(false);
  };

  const handleRailroadClick = () => {
    currentPlayer.cash = currentPlayer.cash - currentTile.data.purchaseCost;
    currentTile.data.owner = currentPlayer.playerNumber; // Set the owner as the player number

    // Find the index of the current player in playerPositions
    const currentPlayerIndex = playerPositions.findIndex(
      (playerData) => playerData.Player === currentPlayer
    );

    currentTile.data.index = currentPlayer.railroads.length;
    setCurrentTile(currentTile);

    // Update the player's position and properties in playerPositions
    if (currentPlayerIndex !== -1) {
      playerPositions[currentPlayerIndex].position = currentTile.tileNum;
      playerPositions[currentPlayerIndex].Player.railroads.push(
        currentTile.data
      );
    }

    // Call the callback to update playerPositions state
    updatePlayerPositions([...playerPositions]);
    setShowEvent(false);
  };

  const landOnMandatorySpace = () => {
    setShowEndTurn(false);
  };

  return (
    <div className={styles.Main}>
      <img
        className={styles.Board}
        src="RealMonopolyBoard.jpeg"
        alt="gameBoard"
      ></img>
      {Spaces.map((tile, index) => (
        <div key={index}>
          <Tile
            tileClass={tile.tileClass}
            tileNum={tile.tileNum}
            playerPositions={playerPositions}
          />
        </div>
      ))}
      {showEvent === true && (
        <>
          {currentTile &&
            currentTile.type === "Property" &&
            currentTile.data && (
              <HandlePropertyEvent
                currentTile={currentTile}
                currentPlayer={currentPlayer}
                playerPositions={playerPositions}
                updatePlayerPositions={updatePlayerPositions}
                handlePropertyClick={handlePropertyClick}
                handlePayment={handlePayment}
                landOnMandatorySpace={landOnMandatorySpace}
              />
            )}

          {currentTile &&
            currentTile.type === "Utility" &&
            currentTile.data && (
              <HandleUtilityEvent
                currentTile={currentTile}
                currentPlayer={currentPlayer}
                playerPositions={playerPositions}
                updatePlayerPositions={updatePlayerPositions}
                handleUtilityClick={handleUtilityClick}
                landOnMandatorySpace={landOnMandatorySpace}
                handlePayment={handlePayment}
              />
            )}

          {currentTile && currentTile.type === "Tax" && currentTile.data && (
            <>
              <HandleTaxEvent
                currentTile={currentTile}
                currentPlayer={currentPlayer}
                playerPositions={playerPositions}
                updatePlayerPositions={updatePlayerPositions}
                handleTaxClick={handleTaxClick}
                landOnMandatorySpace={landOnMandatorySpace}
              />
            </>
          )}

          {currentTile &&
            currentTile.type === "Railroad" &&
            currentTile.data && (
              <HandleRailroadEvent
                currentTile={currentTile}
                currentPlayer={currentPlayer}
                playerPositions={playerPositions}
                updatePlayerPositions={updatePlayerPositions}
                handleRailroadClick={handleRailroadClick}
                landOnMandatorySpace={landOnMandatorySpace}
                handlePayment={handlePayment}
              />
            )}

          {currentTile && currentTile.type === "Chance" && (
            <>
              <HandleChanceEvent
                currentTile={currentTile}
                currentPlayer={currentPlayer}
                playerPositions={playerPositions}
                updatePlayerPositions={updatePlayerPositions}
                landOnMandatorySpace={landOnMandatorySpace}
                handleChance={handleChance}
              />
            </>
          )}

          {currentTile && currentTile.type === "CommunityChest" && (
            <>
              <HandleCommunityChestEvent
                currentTile={currentTile}
                currentPlayer={currentPlayer}
                playerPositions={playerPositions}
                updatePlayerPositions={updatePlayerPositions}
                landOnMandatorySpace={landOnMandatorySpace}
                handleChance={handleChance}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
