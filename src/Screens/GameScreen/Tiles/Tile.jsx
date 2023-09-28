import styles from "./Tile.module.css";

export const Tile = ({ tileNum, tileClass, playerPositions }) => {
  const playersOnTile = playerPositions.filter((yo) => yo.position === tileNum);

  return (
    <div className={tileClass}>
      {playersOnTile.map((item, index) => (
        <div key={index}>
          <img
            src={item.Player.icon}
            alt="player icon"
            className={styles.gamePiece}
          />
        </div>
      ))}
    </div>
  );
};
