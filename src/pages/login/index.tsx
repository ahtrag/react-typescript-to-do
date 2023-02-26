import React, { useContext, useState } from 'react'
import {
    Form,
    Input,
    Button,
    Checkbox,
    Typography,
    message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from "react-router-dom";
import styles from './login.module.css'
import { UserContext } from '../../context/LoginContext';
import { LOGIN_USER } from '../../constant/APIConstant';
import { setData } from '../../utils/utilsStorage';

export const LoginPage: React.FC = () => {
    const [, setUser] = useContext<any>(UserContext)
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

    const navigate = useNavigate()

    const onFinish = (values: any) => {
        const { remember, ...restValues } = values

        try {
            setLoadingSubmit(true)

            fetch(LOGIN_USER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(restValues),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.id) {
                        const { password, ...restData } = data

                        navigate('/home')
                        setUser(restData)
                        setData('user-data', restData)
                        setLoadingSubmit(false)
                    } else {
                        setLoadingSubmit(false)

                        message.error(`${data.detail}. Please check your login detail`)
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div style={{ marginBottom: '24px' }}>
                    <img
                        src="./github.png"
                        height={200}
                        width={200}
                        loading="lazy"
                        alt="logo"
                    />
                    <Typography.Title level={2} style={{ color: 'white' }}>
                        Dark Theme Todo List
                    </Typography.Title>
                </div>
                <Form
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox style={{ color: "white" }}>
                                Remember me
                            </Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            loading={loadingSubmit}
                        >
                            Log in
                        </Button>
                        Or <Link to="/register">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}