import React from "react";
import styles from "./GameBoardStyles.module.css";
import { PlayerUI } from "./PlayerUI/PlayerUI";
import { GameBoard } from "./Tiles/GameBoard";
import { useState } from "react";
import { Dice } from "./Dice/Dice";
import Button from "react-bootstrap/Button";
import { TradeButton } from "./PlayerUI/TradeButton";


import {
  MediterraneanAve,
  BalticAve,
  OrientalAve,
  VermontAve,
  ConnecticutAve,
  StCharlesPlace,
  StatesAve,
  VirginiaAve,
  StJamesPlace,
  TennesseeAve,
  NewYorkAve,
  KentuckyAve,
  IndianaAve,
  IllinoisAve,
  AtlanticAve,
  VentorAve,
  MarvinGardens,
  PacificAve,
  NorthCarolinaAve,
  PennsylvaniaAve,
  ParkPlace,
  Boardwalk,
  ElectricCompany,
  Waterworks,
  IncomeTax,
  LuxaryTax,
  ReadingRailroad,
  PennslyvaniaRailroad,
  BORailroad,
  ShortLine,
  CompleteColorSets,
} from "./Properties";

export const GameScreen = ({ numOfPlayers, onEndGame }) => {
  const createPlayer = (playerNumber, imageUrl) => {
    const Player = {
      playerNumber: playerNumber,
      cash: 1500,
      colorSet: new Map(),
      railroads: [],
      utilities: [],
      properties: [],
      isInJail: false,
      icon: imageUrl,
      position: 0,
      lost: false,
    };
    return Player;
  };

  const createTile = (tileNum, tileClass, type, data) => {
    const tile = {
      tileNum: tileNum,
      tileClass: tileClass,
      type: type,
      data: data,
    };
    return tile;
  };

  const Tiles = [
    createTile(0, styles.GoTile, "Go"),
    createTile(1, styles.MediterraneanAve, "Property", MediterraneanAve),
    createTile(2, styles.CommunityChest1, "CommunityChest"),
    createTile(3, styles.BalticAve, "Property", BalticAve),
    createTile(4, styles.IncomeTax, "Tax", IncomeTax),
    createTile(5, styles.ReadingRailroad, "Railroad", ReadingRailroad),
    createTile(6, styles.OrientalAve, "Property", OrientalAve),
    createTile(7, styles.Chance1, "Chance"),
    createTile(8, styles.VermontAve, "Property", VermontAve),
    createTile(9, styles.ConnecticutAve, "Property", ConnecticutAve),
    createTile(10, styles.Jail, "Jail"),
    createTile(11, styles.StCharlesPlace, "Property", StCharlesPlace),
    createTile(12, styles.ElectricCompany, "Utility", ElectricCompany),
    createTile(13, styles.StatesAve, "Property", StatesAve),
    createTile(14, styles.VirginiaAve, "Property", VirginiaAve),
    createTile(
      15,
      styles.PennsylvaniaRailroad,
      "Railroad",
      PennslyvaniaRailroad
    ),
    createTile(16, styles.StJamesPlace, "Property", StJamesPlace),
    createTile(17, styles.CommunityChest2, "CommunityChest"),
    createTile(18, styles.TennesseeAve, "Property", TennesseeAve),
    createTile(19, styles.NewYorkAve, "Property", NewYorkAve),
    createTile(20, styles.FreeParking, "FreeParking"),
    createTile(21, styles.KentuckyAve, "Property", KentuckyAve),
    createTile(22, styles.Chance2, "Chance"),
    createTile(23, styles.IndianaAve, "Property", IndianaAve),
    createTile(24, styles.IllinoisAve, "Property", IllinoisAve),
    createTile(25, styles.BORailroad, "Railroad", BORailroad),
    createTile(26, styles.AtlanticAve, "Property", AtlanticAve),
    createTile(27, styles.VentorAve, "Property", VentorAve),
    createTile(28, styles.WaterWorks, "Utility", Waterworks),
    createTile(29, styles.MarvinGardens, "Property", MarvinGardens),
    createTile(30, styles.GoToJail, "GoToJail"),
    createTile(31, styles.PacificAve, "Property", PacificAve),
    createTile(32, styles.NorthCarolinaAve, "Property", NorthCarolinaAve),
    createTile(33, styles.CommunityChest3, "CommunityChest"),
    createTile(34, styles.PennsylvaniaAve, "Property", PennsylvaniaAve),
    createTile(35, styles.ShortLine, "Railroad", ShortLine),
    createTile(36, styles.Chance3, "Chance"),
    createTile(37, styles.ParkPlace, "Property", ParkPlace),
    createTile(38, styles.LuxaryTax, "Tax", LuxaryTax),
    createTile(39, styles.Boardwalk, "Property", Boardwalk),
  ];
  //CREATE THE PLAYERS
  const player1 = createPlayer(1, "RutgersLogo.png");
  const player2 = createPlayer(2, "RutgersKnightLogo.png");
  const player3 = createPlayer(3, "RutgersKnight2Logo.png");
  const player4 = createPlayer(4, "FancyRutgersLogo.png");
  const totalTiles = 40;

  const initialPlayerPositions = [];

  if (numOfPlayers >= 2) {
    initialPlayerPositions.push({ Player: player1, position: 0 });
    initialPlayerPositions.push({ Player: player2, position: 0 });
  }

  if (numOfPlayers >= 3) {
    initialPlayerPositions.push({ Player: player3, position: 0 });
  }

  if (numOfPlayers === 4) {
    initialPlayerPositions.push({ Player: player4, position: 0 });
  }

  const [playerPositions, setPlayerPositions] = useState(
    initialPlayerPositions
  );


    
  //HANDLE TURN ORDER
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const currentPlayer = playerPositions[currentPlayerIndex].Player;

  const [showEvent, setShowEvent] = useState(true);
  const [showEndTurn, setShowEndTurn] = useState(false);

  const movePlayer = (steps, player) => {
    const updatedPlayerPositions = [...playerPositions];

    const playerIndex = updatedPlayerPositions.findIndex(
      (playerIndex) => playerIndex.Player === player
    );

    if (playerIndex !== -1) {
      updatedPlayerPositions[playerIndex].position += steps;

      if (updatedPlayerPositions[playerIndex].position >= 40) {
        updatedPlayerPositions[playerIndex].position =
          updatedPlayerPositions[playerIndex].position - 40;

        updatedPlayerPositions[playerIndex].Player.cash =
          updatedPlayerPositions[playerIndex].Player.cash + 200;
      }
      setPlayerPositions(updatedPlayerPositions);
    }
  };

  const [currentTile, setCurrentTile] = useState(Tiles[0]);
  const [showDice, setShowDice] = useState(true); // Add state for showing the dice

  const handleOnRoll = (rollResult) => {
    movePlayer(rollResult, currentPlayer);
    setCurrentTile(Tiles[playerPositions[currentPlayerIndex].position]);
    setShowDice(false);
    setShowEvent(true);
    setShowEndTurn(true); // Set showEndTurn to true
  };

  const checkIfLost = () => {
    const updatedPlayerPositions = playerPositions.map((playerData) => {
      if (playerData.Player.cash <= 0) {
        // Mark the player as lost and reset their properties
        const lostPlayer = { ...playerData.Player, lost: true };
        lostPlayer.properties.forEach((property) => {
          property.owner = 'NA';
        });
        return { ...playerData, Player: lostPlayer };
      }
      return playerData;
    });
  
    // Update the playerPositions with the modified array
    updatePlayerPositions(updatedPlayerPositions);
  };
  
  
  const endTurn = () => {
    checkIfLost();
  
    let nextPlayerIndex = (currentPlayerIndex + 1) % numOfPlayers;
    let winningPlayer = null; // Initialize winningPlayer
  
    // Find the next player who has not lost
    while (playerPositions[nextPlayerIndex].Player.lost === true) {
      nextPlayerIndex = (nextPlayerIndex + 1) % numOfPlayers;
  
      // If all remaining players have lost, end the game
      if (nextPlayerIndex === currentPlayerIndex) {
        // Set the winningPlayer before ending the game
        winningPlayer = playerPositions[nextPlayerIndex].Player;
        onEndGame(winningPlayer);
        return;
      }
    }
  
    setCurrentPlayerIndex(nextPlayerIndex);
    setCurrentTile(Tiles[playerPositions[nextPlayerIndex].position]);
    setShowDice(true);
    setShowEvent(false);
    setShowEndTurn(false);
  
    // Update the winner outside of the loop
    if (!winningPlayer) {
      winningPlayer = playerPositions[nextPlayerIndex].Player;
    }
  };
    
  
    
  const updatePlayerPositions = (updatedPlayerPositions) => {
    setPlayerPositions(updatedPlayerPositions);
  };

  return (
    <div className={styles.Main}>
      <GameBoard
        playerPositions={playerPositions}
        Spaces={Tiles}
        currentTile={currentTile}
        setCurrentTile={setCurrentTile}
        currentPlayer={currentPlayer}
        updatePlayerPositions={updatePlayerPositions}
        showEvent={showEvent}
        setShowEvent={setShowEvent}
        setShowEndTurn={setShowEndTurn}
        showEndTurn={showEndTurn}
      />

      <div className={styles.UserInterface}>
        <h4>Player {currentPlayerIndex + 1}'s turn</h4>
        {numOfPlayers >= 2 && (
          <div className={styles.playerContainer}>
            {playerPositions[0].Player.lost === false &&(
              <PlayerUI
                className={styles.player}
                Player={playerPositions[0].Player}
                playerPositions={playerPositions}
                CompleteColorSets={CompleteColorSets}
              />
            )}
            {playerPositions[1].Player.lost === false &&(
              <PlayerUI
                className={styles.player}
                Player={playerPositions[1].Player}
                playerPositions={playerPositions}
                CompleteColorSets={CompleteColorSets}
              />
            )}
          </div>
        )}

        <div className={styles.playerContainer}>
          {numOfPlayers >= 3 && playerPositions[2].Player.lost === false && (
            <PlayerUI
              className={styles.player}
              Player={playerPositions[2].Player}
              playerPositions={playerPositions}
              CompleteColorSets={CompleteColorSets}
            />
          )}
          {numOfPlayers === 4 && playerPositions[3].Player.lost === false && (
            <PlayerUI
              className={styles.player}
              Player={playerPositions[3].Player}
              playerPositions={playerPositions}
              CompleteColorSets={CompleteColorSets}
            />
          )}
        </div>
        <TradeButton
          playerPositions={playerPositions}
          setPlayerPositions={setPlayerPositions}
          currentPlayer={currentPlayer}
        />

        <Dice
          className={styles.dice}
          onRoll={handleOnRoll}
          showDice={showDice}
          setShowEndTurn={setShowEndTurn}
          showEndTurn={showEndTurn}
        />

        {showEndTurn === true && (
          <Button variant="dark" onClick={endTurn}>
            End Turn
          </Button>
        )}
      </div>
    </div>
  );
};
