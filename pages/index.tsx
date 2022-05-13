import type { NextPage } from 'next'
import Head from 'next/head'
import Keyboard from '../components/keyboard/keyboard'
import WordRow from '../components/wordRow/wordRow'
import styles from '../styles/Home.module.css'
import { BsFillGearFill } from 'react-icons/bs'
import { useState } from 'react'
import Setting from '../components/settingPopup/settingPopup'
import PopUp from '../components/successPopup/popup'

const Home: NextPage = () => {
  const [answer, setAnswer] = useState("beam".toUpperCase())
  const [error, setError] = useState(false)

  const [showSetting, setShowSetting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [hideHint, setHideHint] = useState(true)

  const [currentKey, setCurrentKey] = useState(0)
  const [currentTry, setCurrentTry] = useState(0)

  const [guess1, setGuess1] = useState(Array(answer.length).fill(""))
  const [guess2, setGuess2] = useState(Array(answer.length).fill(""))
  const [guess3, setGuess3] = useState(Array(answer.length).fill(""))
  const [guess4, setGuess4] = useState(Array(answer.length).fill(""))
  const [guess5, setGuess5] = useState(Array(answer.length).fill(""))
  const [guess6, setGuess6] = useState(Array(answer.length).fill(""))

  const closePopup = () => {
    setShowPopup(false)
    setShowSuccess(false)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Your Own Custom Wordle</title>
        <meta name="og:title" content="Create Your Own Custom Wordle!" />
        <meta name="og:description" content="Create Your Own Custom Wordle!" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { showSetting ? <Setting show={showSetting} setShow={setShowSetting} /> : null }
      { (showPopup || showSuccess) ? <PopUp success={showSuccess} closePopup={closePopup} /> : null }
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>Custom Wordle!</h1>
          <BsFillGearFill size={40} className={styles.settingIcon} onClick={() => setShowSetting(true)} />
        </div>
        <button className={styles.myo} onClick={() => setShowPopup(true)}>Make your own now!</button>
        <p>Hint: <span className={ hideHint ? styles.hidden : "" }
          onClick={() => setHideHint(false)} >Coolest person on earth</span></p>
        { error ? <p>Word doesn't exist in a dictionary</p> : null }
        <div className={styles.wordContainer}>
          <WordRow answer={answer} guess={guess1} rowNum={0} curTry={currentTry} 
          setCurTry={setCurrentTry} setWordInd={setCurrentKey} setError={setError} setSuccess={setShowSuccess} />
          <WordRow answer={answer} guess={guess2} rowNum={1} curTry={currentTry} 
          setCurTry={setCurrentTry} setWordInd={setCurrentKey} setError={setError} setSuccess={setShowSuccess} />
          <WordRow answer={answer} guess={guess3} rowNum={2} curTry={currentTry} 
          setCurTry={setCurrentTry} setWordInd={setCurrentKey} setError={setError} setSuccess={setShowSuccess} />
          <WordRow answer={answer} guess={guess4} rowNum={3} curTry={currentTry} 
          setCurTry={setCurrentTry} setWordInd={setCurrentKey} setError={setError} setSuccess={setShowSuccess} />
          <WordRow answer={answer} guess={guess5} rowNum={4} curTry={currentTry} 
          setCurTry={setCurrentTry} setWordInd={setCurrentKey} setError={setError} setSuccess={setShowSuccess} />
          <WordRow answer={answer} guess={guess6} rowNum={5} curTry={currentTry} 
          setCurTry={setCurrentTry} setWordInd={setCurrentKey} setError={setError} setSuccess={setShowSuccess} />
        </div>
        <div className={styles.keyboardContainer}>
          <Keyboard wordInd={currentKey} setWordInd={setCurrentKey} 
            curTry={currentTry} setCurTry={setCurrentTry} 
            guesses={[guess1, guess2, guess3, guess4, guess5, guess6]}
            setGuesses={[setGuess1, setGuess2, setGuess3, setGuess4, setGuess5, setGuess6]}
            error={error} />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Made with &#128151; from &#127481;&#127469;</p>
      </footer>
    </div>
  )
}

export default Home
