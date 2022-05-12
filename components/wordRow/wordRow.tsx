import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './WordRow.module.css'

type Props = {
    answer: string,
    guess: any[],
    rowNum: number,
    curTry: number
}

const WordRow = ({ answer, guess, rowNum, curTry } : Props) => {
    const [checked, setChecked] = useState(false)
    const [addColor, setAddColor] = useState(Array(answer.length).fill(0))

    useEffect(() => {
        if (curTry > rowNum || curTry == 6) {
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
                    console.log(addColor)
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