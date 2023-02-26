import { ArrowLeftOutlined, UserAddOutlined } from '@ant-design/icons'
import { Card, Form, Input, Button, Avatar, notification } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { REGISTER_USER } from '../../constant/APIConstant'
import styles from './register.module.css'

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const Register: React.FC = () => {
    const [loadingRegister, setLoadingRegister] = useState<boolean>(false)
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Register Success',
            description:
                'Registration success, you will be directed into loading page in 5 seconds.',
        });
    };

    const handleRegister = (values: any) => {
        try {
            setLoadingRegister(true)

            fetch(REGISTER_USER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then(res => res.json())
                .then(() => {
                    setLoadingRegister(false)

                    openNotificationWithIcon('success')

                    setTimeout(() => {
                        navigate('/')
                    }, 5000)
                })
        } catch (err) {
            console.log('ERROR_REGISTER >>', err)
        }
    }

    return (
        <>
            {contextHolder}
            <div className={styles.back}>
                <ArrowLeftOutlined
                    className={styles.backButton}
                    onClick={() => navigate('/')}
                />
            </div>
            <div className={styles.container}>
                <Card className={styles.card}>
                    <Avatar
                        size={128}
                        icon={<UserAddOutlined />}
                        className={styles.avatar}
                    />

                    <Form onFinish={handleRegister}>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Name!',
                                },
                            ]}
                        >
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input placeholder="Email. example: jhondoe@email.com" />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input placeholder="Username" />
                        </Form.Item>
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
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                loading={loadingRegister}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    )
} 