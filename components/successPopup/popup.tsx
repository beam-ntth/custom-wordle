import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Popup.module.css'

type Props = {
    success: boolean,
    loss: boolean,
    answer: string,
    closePopup: () => void
}

const PopUp = ({success, loss, answer, closePopup} : Props) => {
    const [created, setCreated] = useState(false)
    const [gameLink, setGameLink] = useState("")
    const [loading, setLoading] = useState(false)

    /**
     * States for error flags
     */
    const [wordLengthError, setWordLengthError] = useState(false)
    const [requiredWordError, setRequiredWordError] = useState(false)
    const [requiredHintError, setRequiredHintError] = useState(false)

    const getTime = () : string => {
        const dt = new Date()
        const date = `${dt.getDate() < 10 ? `0${dt.getDate()}` : dt.getDate()}`
        const month = `${dt.getMonth() + 1 < 10 ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1}`
        return `${month}/${date}/${dt.getFullYear()}`
    }

    const [game, setGame] = useState({
        word: "",
        hint: "",
        mode: 0,
        date_created: getTime()
    })

    const checkFields = () => {
        let errorExist = false
        if (game.word === "") {
            errorExist = true
            setRequiredWordError(true)
        }
        if (game.word.length < 3 || game.word.length > 6) {
            errorExist = true
            setWordLengthError(true)
        }
        if (game.hint === "") {
            errorExist = true
            setRequiredHintError(true)
        }
        return errorExist
    }

    const createGame = async () => {
        setLoading(true)
        const res = await fetch(`/api/create`, {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
        })
        if (res.status != 200) {
            throw new Error("Error while creating the game!")
        }
        const link = await res.json()
        setGameLink(link)
        setCreated(true)
        setLoading(false)
    }

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

                <p>Enter the hint:</p>
                <input type={'text'} placeholder={"What I think of when I see your face"}
                value={game.hint} onChange={e => {
                    let newHint = {...game}
                    newHint.hint = e.target.value
                    setGame(newHint)
                }} />
                {requiredHintError ? <p className={styles.error}>This field is required!</p> : null}

                <p>Enter the word:</p>
                <input type={'text'} placeholder={"Beauty"} value={game.word} onChange={e => {
                    let newWord = {...game}
                    newWord.word = e.target.value.substring(0, 6)
                    setGame(newWord)
                }} />
                {requiredWordError ? <p className={styles.error}>This field is required!</p> : null}
                {wordLengthError ? <p className={styles.error}>A word needs to be between 3-6 letters!</p> : null}

                <p>Choose game mode:</p>
                <select value={game.mode} onChange={e => {
                    let newMode = {...game}
                    newMode.mode = parseInt(e.target.value)
                    setGame(newMode)
                }}>
                    <option value={0}>Light</option>
                    <option value={1}>Dark</option>
                    <option value={2}>Rainbow</option>
                </select>
                {
                    created ?
                    <p>
                        Copy this link and send it to your friends: <a className={styles.gameLink} href={`${gameLink}`} target='_blank'>
                            {`${gameLink}`}
                        </a>
                    </p>
                    :
                    null
                }
                {loading ? <CircularProgress color="primary" className={styles.loader} /> : null}
                <button className={styles.createGame} onClick={() => {
                    if (checkFields()) {
                        return
                    }
                    createGame()
                }}>Create now!</button>
                <div className={styles.modeSetting}>
                    <p>Keep playing here: </p>
                    <button className={styles.restart} onClick={() => closePopup()}>Replay!</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp