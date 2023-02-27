import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Input, message } from 'antd'
import styles from './notecomponent.module.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TODO_URL } from '../../../../constant/APIConstant';
import { getData } from '../../../../utils/utilsStorage';

export const NoteComponent: React.FC = () => {
    const [loadingCreate, setLoadingCreate] = useState<boolean>(false)

    useEffect(() => {

    }, [])

    const handlePostNote = (values: any) => {
        const { title, todoList: valTodo } = values
        const userData = getData('user-data')

        const payloadTodo = valTodo.reduce((res: any, val: any) => {
            res.push({ description: val })

            return res
        }, [])

        const payload = { userId: userData.id, title, todoList: payloadTodo }

        try {
            setLoadingCreate(true)

            fetch(TODO_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then(async res => {
                    const response = await res.json()

                    if (!res.ok) {
                        setLoadingCreate(false)

                        message.error(response.detail)
                    } else {
                        setLoadingCreate(false)
                    }
                })
        } catch (err) {
            console.log('ERROR_POST_TODO >>', err)
        }
    };

    return (
        <>
            <div className={styles.filterContainer}>
                <Card className={styles.card}>
                    <Form
                        onFinish={handlePostNote}
                    >
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your title!',
                                },
                            ]}
                        >
                            <Input
                                showCount
                                className={styles.inputFilter}
                                maxLength={20}
                                placeholder="Title"
                            />
                        </Form.Item>
                        <Form.List name="todoList" initialValue={['']}>
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your to-do!',
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input placeholder='Add Todo...' style={{ width: index === 0 ? '100%' : '90%' }} />
                                            </Form.Item>
                                            {
                                                field.key === 0 ?
                                                    null :
                                                    <MinusCircleOutlined
                                                        className={styles.minus}
                                                        onClick={() => remove(field.name)}
                                                        style={{ color: 'whitesmoke' }}
                                                    />
                                            }
                                        </Form.Item>
                                    ))}
                                    <Form.Item className={styles.button}>
                                        <Button
                                            onClick={() => add()}
                                            icon={<PlusOutlined />}
                                        >
                                            Add Todo
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item className={styles.button}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loadingCreate}
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