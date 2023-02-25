import { ArrowLeftOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './forgotpassword.module.css'

export const ForgotPassword: React.FC = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className={styles.back}>
                <ArrowLeftOutlined
                    className={styles.backButton}
                    onClick={() => navigate('/')}
                />
            </div>
            <div className={styles.container}>
                ForgotPassword
            </div>
        </>
    )
} 