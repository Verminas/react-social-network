import React, {createContext, useEffect, useState} from "react";
import "./App.css";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {useAppDispatch} from "./store";
import {selectAppIsInitialized, selectAppStatus} from "./reducers/appSlice";
import Spinner from "components/Spinner/Spinner";
import {authActions, selectIsLoggedIn} from "./reducers/authSlice";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {Button, Layout, theme, Progress} from 'antd';
import {ErrorSnack} from "components/ErrorSnack/ErrorSnack";

const {Header} = Layout;

export const MenuContext = createContext({collapsed: false})

export function App() {
    const dispatch = useAppDispatch();
    const isInitialized = useSelector(selectAppIsInitialized);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const status = useSelector(selectAppStatus);

    useEffect(() => {
        dispatch(authActions.initializeApp());
    }, []);


    // antd

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const logOutHandler = () => {
        dispatch(authActions.logOut());
    };

    if (!isInitialized) {
        return <Spinner/>;
    }

    return (
        <MenuContext.Provider value={{collapsed}}>
            <Layout style={{minHeight: '100vh'}}>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between',
                        position: 'relative'
                    }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    {isLoggedIn
                        ? <Button
                            type="text"
                            icon={<LogoutOutlined /> }
                            onClick={logOutHandler}
                            style={{
                                fontSize: '16px',
                                height: 64,
                            }}
                        >Log out</Button>
                        : ''}

                    {status === 'loading' && <Progress percent={100} showInfo={false} style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '100%',
                        lineHeight: 0
                    }} strokeLinecap={'square'} size={'small'} status="active" strokeColor={'rgba(22,119,255,0.5)'}/>}
                </Header>

                <ErrorSnack/>

                <Outlet/>
            </Layout>
        </MenuContext.Provider>
    );
}

export default App;
