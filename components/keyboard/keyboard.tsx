import { Dispatch, SetStateAction } from 'react'
import styles from './Keyboard.module.css'

type Props = {
    wordInd: number,
    setWordInd: Dispatch<SetStateAction<number>>,
    curTry: number,
    setCurTry: Dispatch<SetStateAction<number>>,
    guesses: any[],
    setGuesses: Dispatch<SetStateAction<any[]>>[],
    error: boolean
}

const Keyboard = ({ wordInd, setWordInd, curTry, setCurTry, guesses, setGuesses, error } : Props) => {
    
    const wordLength: number = guesses[0].length

    const letterCallBack = (letter: string) => {
        if (wordInd == wordLength) return;
        let newGuess = [...guesses[curTry]]
        newGuess[wordInd] = letter
        setGuesses[curTry](newGuess)
        setWordInd(wordInd+1)
    }

    const deleteCallBack = () => {
        if (wordInd == 0) return;
        let newGuess = [...guesses[curTry]]
        newGuess[wordInd-1] = ""
        setGuesses[curTry](newGuess)
        setWordInd(wordInd-1)
    }

    const enterCallBack = () => {
        if (curTry == 5) {
            alert("You LOST")
            return
        }
        console.log(curTry)
        setWordInd(0)
        setCurTry(curTry+1)
    }

    return (
        <div className={styles.keyboard}>
            <div className={styles.keyboardRow}>
                <div className={styles.letter} key="Q" onClick={() => letterCallBack("Q")}>Q</div>
                <div className={styles.letter} key="W" onClick={() => letterCallBack("W")}>W</div>
                <div className={styles.letter} key="E" onClick={() => letterCallBack("E")}>E</div>
                <div className={styles.letter} key="R" onClick={() => letterCallBack("R")}>R</div>
                <div className={styles.letter} key="T" onClick={() => letterCallBack("T")}>T</div>
                <div className={styles.letter} key="Y" onClick={() => letterCallBack("Y")}>Y</div>
                <div className={styles.letter} key="U" onClick={() => letterCallBack("U")}>U</div>
                <div className={styles.letter} key="I" onClick={() => letterCallBack("I")}>I</div>
                <div className={styles.letter} key="O" onClick={() => letterCallBack("O")}>O</div>
                <div className={styles.letter} key="P" onClick={() => letterCallBack("P")}>P</div>
            </div>
            <div className={styles.keyboardRow}>
                <div className={styles.letter} key="A" onClick={() => letterCallBack("A")}>A</div>
                <div className={styles.letter} key="S" onClick={() => letterCallBack("S")}>S</div>
                <div className={styles.letter} key="D" onClick={() => letterCallBack("D")}>D</div>
                <div className={styles.letter} key="F" onClick={() => letterCallBack("F")}>F</div>
                <div className={styles.letter} key="G" onClick={() => letterCallBack("G")}>G</div>
                <div className={styles.letter} key="H" onClick={() => letterCallBack("H")}>H</div>
                <div className={styles.letter} key="J" onClick={() => letterCallBack("J")}>J</div>
                <div className={styles.letter} key="K" onClick={() => letterCallBack("K")}>K</div>
                <div className={styles.letter} key="L" onClick={() => letterCallBack("L")}>L</div>
            </div>
            <div className={styles.keyboardRow}>
                <div className={styles.specialLetter} key="ENTER" onClick={() => enterCallBack()}>ENTER</div>
                <div className={styles.letter} key="Z" onClick={() => letterCallBack("Z")}>Z</div>
                <div className={styles.letter} key="X" onClick={() => letterCallBack("X")}>X</div>
                <div className={styles.letter} key="C" onClick={() => letterCallBack("C")}>C</div>
                <div className={styles.letter} key="V" onClick={() => letterCallBack("V")}>V</div>
                <div className={styles.letter} key="B" onClick={() => letterCallBack("B")}>B</div>
                <div className={styles.letter} key="N" onClick={() => letterCallBack("N")}>N</div>
                <div className={styles.letter} key="M" onClick={() => letterCallBack("M")}>M</div>
                <div className={styles.specialLetter} key="DEL" onClick={() => deleteCallBack()}>DELETE</div>
            </div>
        </div>
    )
}

export default Keyboard