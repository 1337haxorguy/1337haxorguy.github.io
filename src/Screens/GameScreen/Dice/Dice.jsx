import Button from "react-bootstrap/Button";
import styles from "./Dice.module.css";
import { useState } from "react";

export const Dice = ({
  onRoll,
  showDice,
  setShowEndTurn = { setShowEndTurn },
  showEndTurn = { showEndTurn },
}) => {
  const dice1 = "Dice1.png";
  const dice2 = "Dice2.png";
  const dice3 = "Dice3.png";
  const dice4 = "Dice4.png";
  const dice5 = "Dice5.png";
  const dice6 = "Dice6.png";

  const [dice1Image, setDice1Image] = useState("Dice1.png");
  const [dice2Image, setDice2Image] = useState("Dice2.png");

  const DiceRoll = () => {
    const roll1 = Math.floor(Math.random() * (6)) + 1;
    const roll2 = Math.floor(Math.random() * (6)) + 1;

    const newDice1Image = `Dice${roll1}.png`;
    const newDice2Image = `Dice${roll2}.png`;

    setDice1Image(newDice1Image);
    setDice2Image(newDice2Image);

    const totalRoll = roll1 + roll2;

    onRoll(totalRoll);

    console.log("ROLL DA DICE: " + totalRoll);
  };

  return (
    <div className={styles.Dice}>
      <div>
        <img src={dice1Image} alt="Dice 1" className={styles.Image} />
        <img src={dice2Image} alt="Dice 2" className={styles.Image} />
      </div>

      {showDice === true && (
        <div>
          <Button variant="dark" size="lg" onClick={DiceRoll}>
            Roll Dice
          </Button>
        </div>
      )}
    </div>
  );
};
