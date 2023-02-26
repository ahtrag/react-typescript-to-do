import { ArrowLeftOutlined, UnlockOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Card, Input, notification, Form } from 'antd'
import styles from './changepassword.module.css'
import { getData } from '../../utils/utilsStorage'
import { CHANGE_PASSWORD } from '../../constant/APIConstant'

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const ChangePassword: React.FC = () => {
    const [loadingChange, setLoadingChange] = useState<boolean>(false)
    const [api, contextHolder] = notification.useNotification();

    const navigate = useNavigate()

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Change Password Success',
            description:
                'Change Password success, use your new password next time you log in.',
        });
    };

    const handleChangePassword = (values: any) => {
        const userData = getData('user-data')

        const { id } = userData

        const payload = { id, ...values }

        try {
            setLoadingChange(true)

            fetch(CHANGE_PASSWORD, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then(res => res.json())
                .then(() => {
                    setLoadingChange(false)

                    openNotificationWithIcon('success')
                })
        } catch (err) {
            console.log('ERROR_CHANGE_PASSWORD >>', err)
        }
    }

    return (
        <>
            {contextHolder}
            <div className={styles.back}>
                <ArrowLeftOutlined
                    className={styles.backButton}
                    onClick={() => navigate('/home')}
                />
            </div>
            <div className={styles.container}>
                <Card className={styles.card}>
                    <Avatar
                        size={128}
                        icon={<UnlockOutlined />}
                        className={styles.avatar}
                    />

                    <Form onFinish={handleChangePassword}>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password
                                type="password"
                                placeholder="Your Old Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your New Password!',
                                },
                            ]}
                        >
                            <Input.Password
                                type="password"
                                placeholder="Your New Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                loading={loadingChange}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    )
}