import React from 'react'
import {
    Row,
    Col,
    Avatar,
    Popover,
    Button,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserTypes } from '../../../../interface/UserTypes';

interface HeaderContentProps {
    logoutAccount: () => void;
    userData: UserTypes;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({ logoutAccount, userData }) => {
    const navigate = useNavigate()

    const onMouseOverEvent = (e: any) => {
        e.target.style.color = '#1677ff';
    }

    const onMouseOutEvent = (e: any) => {
        e.target.style.color = 'black';
    }

    const popoverContent = (
        <>
            <div>
                <Button
                    type='ghost'
                    onClick={() => navigate('/change-password')}
                    onMouseOver={onMouseOverEvent}
                    onMouseOut={onMouseOutEvent}
                >
                    Change Password
                </Button>
            </div>
            <div>
                <Button
                    type='ghost'
                    onClick={() => logoutAccount()}
                    onMouseOver={onMouseOverEvent}
                    onMouseOut={onMouseOutEvent}
                >
                    Log out
                </Button>
            </div>
        </>
    )

    return (
        <>
            <Row justify="end">
                <Col span={24} push={50}>
                    <div
                        style={{
                            marginRight: '24px'
                        }}
                    >
                        <Popover
                            placement='bottom'
                            trigger='click'
                            content={popoverContent}
                            style={{ padding: 0 }}
                        >
                            <Avatar
                                alt="avatar"
                                style={{
                                    background: 'whitesmoke',
                                    color: '#141414',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                }}
                            >
                                {(userData.username || '').charAt(0)}
                            </Avatar>
                        </Popover>
                    </div>
                </Col>
            </Row>
        </>
    )
}