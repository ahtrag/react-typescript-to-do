import { ArrowLeftOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './content.module.css'

export const ContentPage: React.FC = () => {
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
                This is Content Page
            </div>
        </>
    )
} 