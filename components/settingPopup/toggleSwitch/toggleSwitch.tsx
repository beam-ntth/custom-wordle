import { Dispatch, SetStateAction } from 'react'
import styles from './ToggleSwitch.module.css'

type Props = {
    checked: boolean,
    setChecked: Dispatch<SetStateAction<boolean>>
}

const Switch = ({checked, setChecked} : Props) => {
    return (
        <label className={styles.switch}>
            <input type={styles.checkbox} onClick={() => setChecked(!checked)} />
            <span className={`${styles.slider} ${styles.round} ${checked ? styles.active : ""}`}></span>
        </label>
    )
}

export default Switch