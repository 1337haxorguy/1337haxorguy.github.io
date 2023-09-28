import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import styles from "./GameBoardStyles.module.css";
import { ViewPropertiesButton } from "./ViewPropertiesButton";
import Button from "react-bootstrap/Button";
import { TradeButton } from "./TradeButton";
import { useState } from "react";

export const PlayerUI = ({
  Player,
  CompleteColorSets,
}) => {

  const [updatedPlayer, setUpdatedPlayer] = useState(Player);

  
  const upgradeProperty = (property, index) => {
    // Increment the property.index by one
    if (Player.cash > property.buildingCost) {
      property.index = property.index + 1;
      const updatedPlayerCopy = { ...updatedPlayer };
      updatedPlayerCopy.properties[index] = property;
  
      // Update the state with the modified player object
      setUpdatedPlayer(updatedPlayerCopy);  

      Player.cash = Player.cash - property.buildingCost
    } else {
      return(
        <p>You can't afford this!</p>
      )
    }


  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <div>
          <Modal.Header>
            <Modal.Title>Player {Player.playerNumber}</Modal.Title>
            <img src={Player.icon} alt="Player Icon" className={styles.icon} />
          </Modal.Header>
        </div>

        <Modal.Body>
          <Container>
            <Row>
            <div className={styles.propertyItem}>
                <p className={styles.cash}>₩: {Player.cash} </p>

                <div className={styles.viewProperties}>


                  <ViewPropertiesButton
                    Player={updatedPlayer}
                    CompleteColorSets={CompleteColorSets}
                    upgradeProperty={upgradeProperty}
                  />
                </div>
                </div>
            </Row>
          </Container>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};
