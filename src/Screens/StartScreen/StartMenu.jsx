import styles from './StartStyles.module.css'
import { StartButton } from './StartButton';
import { PlayerSelector } from './PlayerSelector';

export const StartMenu = ({onStartClick, sendNumOfPlayersToGameStates}) => {

    const sendNumOfPlayers = (numOfPlayers) => {
        sendNumOfPlayersToGameStates(numOfPlayers)
    };
    
    return (
        <div className= {styles.Main}>
            <img src='CroppedRonopolyLogo.png' alt = 'Ronopoly Logo'></img>

            <div className={styles.Padding}>
                <PlayerSelector setNumOfPlayers={sendNumOfPlayers}/>
            </div>
                
            <div >
                <StartButton onStartClick={onStartClick}/>
            </div>


        </div>
    );
}