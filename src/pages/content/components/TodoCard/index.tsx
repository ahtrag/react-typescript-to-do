import {
    DeleteOutlined,
    // EditOutlined,
    CheckOutlined,
    ExclamationCircleFilled,
} from '@ant-design/icons'
import { Card, Checkbox, List, message, Modal, Tooltip } from 'antd'
import React, { useState } from 'react'
import { TODO_URL } from '../../../../constant/APIConstant'
import { TodoStatus } from '../../../../interface/TodoTypes'
import styles from './todocard.module.css'

const { confirm } = Modal

export const TodoCard: React.FC<any> = ({ todoData, getTodoList, loading }) => {
    const [checked, setChecked] = useState<any>(todoData.todoList || [])

    const checkMore = (items: any) => {
        setChecked([...checked, items]);
    };

    const checkLess = (items: any) => {
        setChecked(checked.filter((check: any) => !items.description.includes(check.description)));
    };

    const deleteTodo = () => {
        const payload = { ...todoData, status: TodoStatus.DELETED }

        confirm({
            title: `Do you want to delete ${todoData.title}?`,
            icon: <ExclamationCircleFilled />,
            content: 'This todo can be restored later',
            onOk() {
                try {
                    fetch(`${TODO_URL}/${todoData.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    })
                        .then(async res => {
                            const response = await res.json()

                            if (!res.ok) {
                                message.error(response.detail)
                            } else {
                                message.success('To-do list deleted!')
                                getTodoList()
                            }
                        })
                } catch (err) {
                    console.log('ERROR_DELETE_TODO >>', err)
                }
            },
            onCancel() { },
        });
    }

    const updateTodo = () => {
        const combineNewTodo = [...checked].reduce((prev, curr) => {
            const index = prev.findIndex((val: any) => val.description === curr.description)
            if (index === -1) {
                prev.push(curr)
            } else {
                prev[index] = curr
            }

            return prev
        }, [...todoData.todoList])


        const payload = { ...todoData, todoList: combineNewTodo }

        try {
            fetch(`${TODO_URL}/${todoData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then(async res => {
                    const response = await res.json()

                    if (!res.ok) {
                        message.error(response.detail)
                    } else {
                        message.success('To-do list has been updated!')
                        getTodoList()
                    }
                })
        } catch (err) {
            console.log('ERROR_DELETE_TODO >>', err)
        }
    }

    return (
        <Card
            title={todoData.title}
            className={styles.cardContent}
            loading={loading}
            actions={[
                <Tooltip title="Delete Todo">
                    <DeleteOutlined key="delete" onClick={() => deleteTodo()} />
                </Tooltip>,
                // <EditOutlined key="edit" />,
                <Tooltip title="Update Todo">
                    <CheckOutlined key="check" onClick={() => updateTodo()} />
                </Tooltip>,
            ]}
        >
            <List
                itemLayout='horizontal'
                dataSource={todoData.todoList}
                renderItem={(data: any) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <>
                                    <Checkbox
                                        defaultChecked={data.isDone}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                checkMore(
                                                    {
                                                        ...data,
                                                        isDone: true,
                                                    }
                                                )
                                            } else {
                                                checkLess(data)
                                            }
                                        }}
                                    /></>
                            }
                            description={
                                data.isDone ?
                                    <span className={styles.striketrought}>
                                        {data.description}
                                    </span> :
                                    <span>{data.description}</span>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    )
}