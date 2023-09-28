import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./GameBoardStyles.module.css";
import { TradeProperties } from "./TradeProperties";
import { CompleteColorSets } from "../Properties";

export const TradeButton = ({
  playerPositions,
  currentPlayer,
  setPlayerPositions,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSelectedPlayer(null);
    setPropertiesForTrade1([]);
    setPropertiesForTrade2([]);
    setCashCurrentPlayer(0);
    setCashSelectedPlayer(0);
  };
  const handleShow = () => setShow(true);

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [propertiesForTrade1, setPropertiesForTrade1] = useState([]);
  const [propertiesForTrade2, setPropertiesForTrade2] = useState([]);

  const [cashCurrentPlayer, setCashCurrentPlayer] = useState(0);
  const [cashSelectedPlayer, setCashSelectedPlayer] = useState(0);

  const onPropertySelect1 = (Property) => {
    setPropertiesForTrade1([...propertiesForTrade1, Property]);
  };

  const onPropertySelect2 = (Property) => {
    setPropertiesForTrade2([...propertiesForTrade2, Property]);
  };

  const increaseColorSetIndexes = (color, Player) => {
    Player.properties.forEach((property) => {
      if (property.color === color) {
        property.index += 1;
      }
    });
  };



  const handleTrade = (
    cashCurrentPlayer,
    cashSelectedPlayer,
    propertiesCurrentPlayer,
    propertiesSelectedPlayer
  ) => {
    console.log("currentPlayerCash", cashCurrentPlayer, currentPlayer);
    console.log("selectedPlayerCash", cashSelectedPlayer, selectedPlayer);

    selectedPlayer.cash = selectedPlayer.cash + cashCurrentPlayer;
    currentPlayer.cash = currentPlayer.cash + cashSelectedPlayer;

    selectedPlayer.cash = selectedPlayer.cash - cashSelectedPlayer;
    currentPlayer.cash = currentPlayer.cash - cashCurrentPlayer;

    propertiesCurrentPlayer.forEach((property) => {
      property.index = 0;
      currentPlayer.properties = currentPlayer.properties.filter(
        (p) => (p !== property
        )
      );
      if (property.color) {
        currentPlayer.colorSet.set(property.color, currentPlayer.colorSet.get(property.color) - 1)

      }
      selectedPlayer.properties.push(property);
      if (selectedPlayer.colorSet.has(property.color)) {
        selectedPlayer.colorSet.set(
          property.color,
          selectedPlayer.colorSet.get(property.color) + 1
        );
      } else {
        selectedPlayer.colorSet.set(property.color, 1)
      }

      if (
        selectedPlayer.colorSet.get(property.color) ===
        CompleteColorSets.get(property.color)
      ) {
        increaseColorSetIndexes(property.color, selectedPlayer);
      }
  
    });

    propertiesSelectedPlayer.forEach((property) => {
      property.index = 0;
      selectedPlayer.properties = selectedPlayer.properties.filter(
        (p) => p !== property
      );
      if (property.color) {
        selectedPlayer.colorSet.set(property.color, selectedPlayer.colorSet.get(property.color) - 1)
      }
      currentPlayer.properties.push(property);
      if (currentPlayer.colorSet.has(property.color)) {
        currentPlayer.colorSet.set(
          property.color,
          currentPlayer.colorSet.get(property.color) + 1
        );
      } else {
        currentPlayer.colorSet.set(property.color, 1)
      }

      if (
        currentPlayer.colorSet.get(property.color) ===
        CompleteColorSets.get(property.color)
      ) {
        increaseColorSetIndexes(property.color, currentPlayer);
      }

    });

    const updatedPlayerPositions = [...playerPositions];

    const currentPlayerIndex = updatedPlayerPositions.findIndex(
      (playerIndex) => playerIndex.Player === currentPlayer
    );

    const selectedPlayerIndex = updatedPlayerPositions.findIndex(
      (playerIndex) => playerIndex.Player === selectedPlayer
    );

    if (currentPlayerIndex !== -1) {
      updatedPlayerPositions[currentPlayerIndex].Player = currentPlayer;
    }

    if (selectedPlayerIndex !== -1) {
      updatedPlayerPositions[selectedPlayerIndex].Player = selectedPlayer;
    }

    setPlayerPositions(updatedPlayerPositions);

    handleClose();
  };
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Trade
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Trading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPlayer === null ? (
            <>
              <h5>Who would you like to trade with?</h5>
              {playerPositions
                .filter((playerItem) => playerItem.Player !== currentPlayer)
                .map((playerItem, index) => (
                  <>
                  {playerItem.Player.lost === false &&(
                  <Button
                  key={index}
                  className={styles.Buttons}
                  variant="dark"
                  onClick={() => setSelectedPlayer(playerItem.Player)}
                >
                  Player {playerItem.Player.playerNumber}
                </Button>
                  )}

                  </>
                ))}
            </>
          ) : (
            <div className={styles.tradeRow}>
              <div className={styles.trade1}>
                <h5>Player {currentPlayer.playerNumber}</h5>
                <p>Cash</p>
                <input
                  type="number"
                  max={currentPlayer.cash}
                  min={0}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0 && value <= currentPlayer.cash) {
                      setCashCurrentPlayer(value);
                    }
                  }}
                />
                <TradeProperties
                  Player={currentPlayer}
                  onPropertySelect={onPropertySelect1}
                  propertiesForTrade={propertiesForTrade1}
                />
                {propertiesForTrade1.length > 0 && (
                  <div>
                    <p>Trading Away:</p>
                    {propertiesForTrade1.map((PropertyTrading, index) => (
                      <p key={index}>{PropertyTrading.name}</p>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.trade2}>
                <h5>Player {selectedPlayer.playerNumber}</h5>
                <p>Cash</p>
                <input
                  type="number"
                  max={selectedPlayer.cash}
                  min={0}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0 && value <= selectedPlayer.cash) {
                      setCashSelectedPlayer(value);
                    }
                  }}
                />
                <TradeProperties
                  Player={selectedPlayer}
                  onPropertySelect={onPropertySelect2}
                  propertiesForTrade={propertiesForTrade2}
                />
                {propertiesForTrade2.length > 0 && (
                  <div>
                    <p>Trading Away:</p>
                    {propertiesForTrade2.map((PropertyTrading, index) => (
                      <p key={index}>{PropertyTrading.name}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedPlayer != null && (
            <Button
              variant="secondary"
              onClick={() =>
                handleTrade(
                  cashCurrentPlayer,
                  cashSelectedPlayer,
                  propertiesForTrade1,
                  propertiesForTrade2
                )
              }
            >
              Trade?
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
