import { Dispatch, SetStateAction, useState } from 'react'
import styles from './SettingPopup.module.css'
import Switch from './toggleSwitch/toggleSwitch'
import { ImCross } from 'react-icons/im'

type Props = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}

const Setting = ({show, setShow} : Props) => {
    const [checked, setChecked] = useState(false)

    return (
        <div className={`${styles.backDrop}`}>
            <div className={`${styles.setting}`}>
                <div className={styles.heading}>
                    <h1>Settings</h1>
                    <ImCross className={styles.cross} size={30} onClick={() => setShow(false)} />
                </div>
                <div className={styles.modeSetting}>
                    <p>{checked ? 'Dark' : 'Light'} Mode: </p>
                    <Switch checked={checked} setChecked={setChecked} />
                </div>
            </div>
        </div>
    )
}

export default Setting