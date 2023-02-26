import { ArrowLeftOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './changepassword.module.css'

export const ChangePassword: React.FC = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className={styles.back}>
                <ArrowLeftOutlined
                    className={styles.backButton}
                    onClick={() => navigate('/home')}
                />
            </div>
            <div className={styles.container}>
                Change Password
            </div>
        </>
    )
}