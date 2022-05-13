import { Dispatch, SetStateAction } from 'react'
import styles from './ToggleSwitch.module.css'

type Props = {
    checked: number,
    setChecked: Dispatch<SetStateAction<number>>
}

const Switch = ({checked, setChecked} : Props) => {
    const getMode = () => {
        if (checked === 0) {
            return ""
        }
        if (checked === 1) {
            return `${styles.active}`
        }
        return `${styles.rainbow}`
    }

    return (
        <label className={styles.switch}>
            <input type={'checkbox'} onClick={() => setChecked((checked+1)%3)} />
            <span className={`${styles.slider} ${styles.round} ${getMode()}`}></span>
        </label>
    )
}

export default Switch