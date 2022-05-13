import { Dispatch, SetStateAction, useState } from 'react'
import styles from './SettingPopup.module.css'
import Switch from './toggleSwitch/toggleSwitch'
import { ImCross } from 'react-icons/im'

type Props = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    checked: number,
    setChecked: Dispatch<SetStateAction<number>>
}

const Setting = ({show, setShow, checked, setChecked} : Props) => {
    
    const getTitle = () => {
        if (checked === 0) {
            return 'Light'
        }
        if (checked === 1) {
            return 'Dark'
        }
        return "Rainbow"
    }

    return (
        <div className={`${styles.backDrop}`}>
            <div className={`${styles.setting}`}>
                <div className={styles.heading}>
                    <h1>Settings</h1>
                    <ImCross className={styles.cross} size={30} onClick={() => setShow(false)} />
                </div>
                <div className={styles.modeSetting}>
                    <p>{getTitle()} Mode: </p>
                    <Switch checked={checked} setChecked={setChecked} />
                </div>
            </div>
        </div>
    )
}

export default Setting