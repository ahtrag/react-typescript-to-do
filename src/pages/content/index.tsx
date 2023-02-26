import {
    BulbOutlined,
    UserOutlined,
} from '@ant-design/icons'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './content.module.css'
import { Layout, Menu, Spin } from 'antd';
import type { MenuProps } from 'antd';
import { HeaderContent } from './components/HeaderContent';
import { AboutUs } from './components/AboutUs';
import { NoteComponent } from './components/NoteComponent';
import { UserContext } from '../../context/LoginContext';
import { clearData, getData } from '../../utils/utilsStorage';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Notes', '1', <BulbOutlined />),
    getItem('About Us', '2', <UserOutlined />)
]

export const ContentPage: React.FC = () => {
    const [user] = useContext<any>(UserContext)

    const localUserData = getData('user-data')

    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [loadingContent, setLoadingContent] = useState<boolean>(false)
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>("1")

    const logoutAccount = () => {
        clearData()

        navigate('/')
    }

    const renderContent = (key: string) => {
        switch (key) {
            case '1':
                return (<NoteComponent />);
            case '2':
                return (<AboutUs />);
            default:
                break;
        }
    }

    const handleChangeMenu = (e: any) => {
        setSelectedMenuItem(e.key)

        setLoadingContent(true)

        setTimeout(() => {
            setLoadingContent(false)
        }, 500)
    }

    return (
        <Layout style={{ minHeight: '100vh', background: '#141414' }} hasSider>
            <Sider
                collapsible
                theme='dark'
                className={styles.sider}
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className={styles.logo}>
                    <img
                        src="./github.png"
                        height={30}
                        width={30}
                        loading="lazy"
                        alt="logo small"
                    />
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                    className={styles.menu}
                    onClick={(e) => handleChangeMenu(e)}
                />
            </Sider>
            <Layout>
                <Header
                    className={styles.header}
                >
                    <HeaderContent
                        logoutAccount={logoutAccount}
                        userData={user ? user : localUserData}
                    />
                </Header>
                <Content className={styles.container}>
                    {
                        loadingContent ?
                            <Spin /> :
                            renderContent(selectedMenuItem)
                    }
                </Content>
                <Footer className={styles.footer}>
                    Dua Digital ©2023 Assesment Test
                </Footer>
            </Layout>
        </Layout>
    )
} 