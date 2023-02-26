import React from 'react'
import { Button, Form, Input, Space } from 'antd'
import styles from './notecomponent.module.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const NoteComponent: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Change:', values);
    };

    return (
        <>
            <div className={styles.filterContainer}>
                <Form onFinish={onFinish}>
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
                                {fields.map((field) => (
                                    <Space
                                        key={field.key}
                                        style={{ display: "flex" }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...field}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your to-do!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder='Add Todo...' />
                                        </Form.Item>
                                        {field.key === 0 ? null : <MinusCircleOutlined
                                            onClick={() => remove(field.name)}
                                            style={{ color: 'whitesmoke' }}
                                        />}
                                    </Space>
                                ))}
                                <Form.Item>
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </>
    )
}