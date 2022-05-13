import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import AllWords from '../allPossibleWords'
import styles from './WordRow.module.css'

type Props = {
    answer: string,
    guess: any[],
    setWordInd: Dispatch<SetStateAction<number>>,
    rowNum: number,
    curTry: number,
    setCurTry: Dispatch<SetStateAction<number>>,
    setError: Dispatch<SetStateAction<boolean>>,
    setSuccess: Dispatch<SetStateAction<boolean>>
}

const WordRow = ({ answer, guess, setWordInd, rowNum, curTry, setCurTry, setError, setSuccess } : Props) => {
    const [checked, setChecked] = useState(false)
    const [addColor, setAddColor] = useState(Array(answer.length).fill(0))

    useEffect(() => {
        if ((curTry > rowNum || curTry == 6) && !checked) {
            if (!AllWords.includes(guess.join("").toLowerCase()) && guess.length === 5) {
                setError(true)
                setWordInd(guess.length)
                setCurTry(rowNum)
                return
            }
            setError(false)
            let newColor = Array(answer.length).fill(0)
            for (let i = 0; i < answer.length; i++) {
                if (answer.includes(guess[i])) {
                    if (answer[i] == guess[i]) {
                        newColor[i] = 2
                        continue
                    }
                    newColor[i] = 1
                    continue
                }
                newColor[i] = 0
            }
            setAddColor(newColor)
            setChecked(true)
            if (newColor.every(x => x === 2)) {
                setSuccess(true)
                return
            }
        }
    }, [curTry])

    const getClassName = (num: number) : string => {
        if (num == 0) {
            return `${styles.wordLetter} ${styles.grey}`
        }
        if (num == 1) {
            return `${styles.wordLetter} ${styles.yellow}`
        }
        return `${styles.wordLetter} ${styles.green}`
    }

    return (
        <div className={styles.guessWord}>
            { 
                checked ?
                guess.map((x, ind) => {
                    if (ind == guess.length-1) {
                        return <div key={`row_${ind}`} className={getClassName(addColor[ind])} style={{ margin: 0 }}>{x}</div>
                    }
                    return <div key={`row_${ind}`} className={getClassName(addColor[ind])}>{x}</div>
                })
                :
                guess.map((x, ind) => {
                    if (ind == guess.length-1) {
                        return <div key={`row_${ind}`} className={styles.wordLetter} style={{ margin: 0 }}>{x}</div>
                    }
                    return <div key={`row_${ind}`} className={styles.wordLetter}>{x}</div>
                }) 
            }
        </div>
    )
}

export default WordRow