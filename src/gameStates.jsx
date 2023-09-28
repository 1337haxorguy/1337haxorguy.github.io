import { useState } from "react";
import { StartMenu } from "./Screens/StartScreen/StartMenu";
import { GameScreen } from "./Screens/GameScreen/GameScreen";
import { GameOver } from "./Screens/GameOver";


export const GameStates = () => { 

    const [mode, setMode] = useState('start');

    const [winner, setWinner] = useState("no one"); // Initialize winner state

    // Define the onEndGame function to handle ending the game
    const onEndGame = (winningPlayer) => {
      console.log('Game Over!');
      setWinner(winningPlayer); // Set the winner in the state
      setMode('gameOver');
    };
    
    const [numOfPlayers, setNumOfPlayers] = useState(2);

    const getNumOfPlayers = (numOfPlayers) => {
        setNumOfPlayers(numOfPlayers);
        console.log("numOfPlayers:", numOfPlayers);
      };

    return (
        <div>
        {mode === 'start' && (
            <StartMenu onStartClick = 
                {() => setMode('gameBoard')} 
                sendNumOfPlayersToGameStates = {getNumOfPlayers}
         />)}

        {mode === 'gameBoard' && (
        <>
        <GameScreen numOfPlayers = {numOfPlayers} onEndGame = {onEndGame}/>
        
        </>
        )}
        

        {mode === 'gameOver' && <GameOver winner={winner} />}

        </div>

    );

};






