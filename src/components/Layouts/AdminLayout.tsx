import { Breadcrumb, Dropdown, Layout, Menu } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import {
  authActions,
  selectCurrentUser
} from '../../features/auth/authSlice'
const { Header, Footer, Content } = Layout

const DropdownMenu = (handleLogoutOnClick: Function) => (
  <Menu style={{ width: 100 }}>
    <Menu.Item key="0">Settings</Menu.Item>
    <Menu.Item key="1" onClick={() => handleLogoutOnClick()}>
      Logout
    </Menu.Item>
  </Menu>
)

type AdminLayoutProps = {
  children?: React.ReactElement
}

export function AdminLayout(props: AdminLayoutProps) {
  const dispatch = useAppDispatch()

  const currentUser = useSelector(selectCurrentUser)

  function handleLogoutOnClick() {
    dispatch(authActions.logout())
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Dropdown overlay={DropdownMenu(handleLogoutOnClick)} trigger={['click']}>
          <Avatar
            style={{
              position: 'absolute',
              right: 20,
              top: 10,
              backgroundColor: '#f56a00',
            }}
            size={'large'}
          >
            {currentUser.name[0].toUpperCase()}
          </Avatar>
        </Dropdown>
        ,
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}
