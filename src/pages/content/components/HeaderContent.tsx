import React from 'react'
import {
    Row,
    Col,
    Avatar,
    Popover,
    Button,
} from 'antd'

interface HeaderContentProps {
    logoutAccount: () => void
}

export const HeaderContent: React.FC<HeaderContentProps> = ({ logoutAccount }) => {
    const mockUser = 'User'

    const popoverContent = (
        <Button
            type='ghost'
            onClick={() => logoutAccount()}
        >
            Logout
        </Button>
    )

    return (
        <>
            <Row justify="end">
                <Col span={12}>

                </Col>
                <Col span={12} push={50}>
                    <div>
                        <Popover
                            placement='bottom'
                            trigger='click'
                            content={popoverContent}
                        >
                            <Avatar
                                alt="avatar"
                                style={{
                                    background: 'whitesmoke',
                                    color: '#141414',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    marginRight: '12px',
                                }}
                            >
                                {mockUser.charAt(0)}
                            </Avatar>
                        </Popover>
                    </div>
                </Col>
            </Row>
        </>
    )
}