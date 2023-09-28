import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./GameBoardStyles.module.css";

export const ViewPropertiesButton = ({ Player, CompleteColorSets, upgradeProperty }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Properties
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Player {Player.playerNumber}'s Owned Properties</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            {Player.properties.length !== 0 ? (
              <>
                <>
                  <h5>Properties</h5>
                  <div>
                  {Player.properties.map((property, index) => (
                    <li key={index} className={styles.propertyItem}>
                      {property.name}
                      {property.index > 1 && (
                        <p className={styles.viewProperties}>Houses: {property.index - 1}</p>
                      )}
                      <p className={styles.viewProperties} > Rent: ₩{property.rent[property.index]}</p>
                      {Player.colorSet.has(property.color) && (
                        <>
                          {Player.colorSet.get(property.color) ===
                            CompleteColorSets.get(property.color) && (
                            <>
                              {property.index < 5 && (
                                <Button
                                  variant="dark"
                                    className={styles.viewProperties}
                                  onClick={() =>
                                    upgradeProperty(property, index)
                                  }
                                >
                                  Upgrade for ₩{property.buildingCost}?
                                </Button>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                  </div>
                </>
              </>
            ) : (
              <h6 className={styles.viewProperties}>No properties owned</h6>
            )}

            {Player.railroads.length !== 0 ? (
              <>
                <>
                  <h5>Railroads</h5>
                  {Player.railroads.map((property, index) => (
                    <li key={index}>{property.name}</li>
                  ))}
                </>
              </>
            ) : (
              <h6 className={styles.viewProperties}>No railroads owned</h6>
            )}

            {Player.utilities.length !== 0 ? (
              <>
                <>
                  <h5>Utilities</h5>
                  {Player.utilities.map((property, index) => (
                    <li key={index}>{property.name}</li>
                  ))}
                </>
              </>
            ) : (
              <h6 className={styles.viewProperties}>No utilities owned</h6>
            )}
          </>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
