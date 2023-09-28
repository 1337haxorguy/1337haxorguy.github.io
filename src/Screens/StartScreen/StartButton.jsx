import styles from './StartStyles.module.css'

export const StartButton = ({onStartClick}) => {
    return (

        <button className={styles.StartButton} onClick={onStartClick} >Start Button</button>

    );
}