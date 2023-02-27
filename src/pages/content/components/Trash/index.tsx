import { ExclamationCircleFilled, ReloadOutlined } from '@ant-design/icons'
import { Card, List, message, Modal, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { TODO_URL } from '../../../../constant/APIConstant'
import { TodoStatus } from '../../../../interface/TodoTypes'
import styles from './trash.module.css'

const { confirm } = Modal

export const Trash: React.FC = () => {
    const [loadingCard, setLoadingCard] = useState<boolean>(false)
    const [listTodo, setListTodo] = useState<any>([])

    const reloadCardComponent = () => {
        setLoadingCard(true)

        setTimeout(() => {
            setLoadingCard(false)
        }, 3000)
    }

    const getTodoList = () => {
        try {
            fetch(`${TODO_URL}?status.equal=deleted`)
                .then(async res => {
                    const response = await res.json()

                    if (!res.ok) {
                        message.error(response.detail)
                    } else {
                        setListTodo(response)
                        reloadCardComponent()
                    }
                })
        } catch (err) {
            console.log('ERORR_FETCH_TODO >>', err)
        }
    }

    useEffect(() => {
        getTodoList()
    }, [])

    const restoreTodo = (data: any) => {
        const payload = { ...data, status: TodoStatus.ACTIVE }

        confirm({
            title: `Do you want to restore ${data.title}?`,
            icon: <ExclamationCircleFilled />,
            content: 'This todo will be restored into Note pages',
            onOk() {
                try {
                    fetch(`${TODO_URL}/${data.id}`, {
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

    return (
        <div className={styles.filterContainer}>
            <List
                style={{ marginTop: '12px', textAlign: 'left' }}
                dataSource={listTodo}
                renderItem={(item: any) => (
                    <List.Item>
                        <Card
                            title={item.title}
                            className={styles.cardContent}
                            loading={loadingCard}
                            extra={
                                <Tooltip title="Restore Todo">
                                    <ReloadOutlined onClick={() => restoreTodo(item)} />
                                </Tooltip>
                            }
                        >
                            <List
                                itemLayout='horizontal'
                                dataSource={item.todoList}
                                renderItem={(data: any) => (
                                    <List.Item>
                                        <List.Item.Meta
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
                    </List.Item>
                )}
            />
        </div>
    )
}