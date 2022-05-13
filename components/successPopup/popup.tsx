import { useState } from 'react'
import styles from './Popup.module.css'

type Props = {
    success: boolean,
    loss: boolean,
    answer: string,
    closePopup: () => void
}

const PopUp = ({success, loss, answer, closePopup} : Props) => {
    const [created, setCreated] = useState(false)

    return (
        <div className={`${styles.backDrop}`}>
            <div className={`${styles.setting}`}>
                <div className={styles.heading}>
                    { success ? <h1>Congratulations!</h1> : null }
                    { loss ? <h1>Good Try</h1> : null }
                    { (!success && !loss) ? <h1>Let's create your wordle!</h1> : null }
                </div>
                { loss ? <p>The answer is actually <strong>{answer}</strong></p> : null }
                <p>Share your word with your friends!</p>
                <p>Enter the word:</p>
                <input type={'text'} placeholder={"Bitch"} />
                {
                    created ?
                    <p>
                        Copy this link and send it to your friends: (DONT CLICK YET) 
                        <a href='https://customwordle.com/?key=game1'>https://customwordle.com/?key=game1</a>
                    </p>
                    :
                    null
                }
                <button className={styles.createGame} onClick={() => setCreated(true)}>Create now!</button>
                <div className={styles.modeSetting}>
                    <p>Keep playing here: </p>
                    <button className={styles.restart} onClick={() => closePopup()}>Replay!</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp