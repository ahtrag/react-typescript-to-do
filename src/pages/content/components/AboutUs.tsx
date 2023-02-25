import React from 'react'
import {
    Row,
    Col,
    Card,
    Avatar,
} from 'antd'

const garthaCite = "Life is a journey, and the journey itself is home"
const ryanCite = "Lorem ipsum sit dolor amet"

export const AboutUs: React.FC = () => {
    const responsiveGrid = {
        xs: 6,
        sm: 6,
        md: 6,
        lg: 12,
        xl: 12,
    }

    const cardStyle = {
        backgroundColor: '#242525',
        color: 'whitesmoke',
        fontWeight: 'bold',
        border: 'none',
        minHeight: '350px',
        minWidth: '300px',
        margin: '0 128px',
    }

    const avatarStyle = {
        margin: '24px',
        minHeight: '150px',
        minWidth: '150px',
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col {...responsiveGrid}>
                    <Card style={cardStyle}>
                        <Avatar src="./gartha.jfif" style={avatarStyle} />
                        <div>
                            Gartha - Front-End
                        </div>
                        <div style={{ margin: '12px' }}>
                            <cite>
                                {garthaCite}
                            </cite>
                        </div>
                    </Card>
                </Col>
                <Col {...responsiveGrid}>
                    <Card style={cardStyle}>
                        <Avatar src="./ryan.jfif" style={avatarStyle} />
                        <div>
                            Ryan - Back-End
                        </div>
                        <div style={{ margin: '12px' }}>
                            <cite>
                                {ryanCite}
                            </cite>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}