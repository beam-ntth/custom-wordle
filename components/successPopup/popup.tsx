import styles from './Popup.module.css'

type Props = {
    success: boolean,
    closePopup: () => void
}

const PopUp = ({success, closePopup} : Props) => {
    return (
        <div className={`${styles.backDrop}`}>
            <div className={`${styles.setting}`}>
                <div className={styles.heading}>
                    { success ? <h1>Congratulations!</h1> : null }
                </div>
                <div className={styles.modeSetting}>
                    <button className={styles.restart} onClick={() => closePopup()}>Restart</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp