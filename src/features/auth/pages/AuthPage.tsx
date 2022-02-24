import React from 'react'
import { Tabs, Card } from 'antd'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

const { TabPane } = Tabs

const AuthPage = () => {
  return (
    <div
      style={{
        padding: '0 50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card style={{ width: 600}}>

      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Login" key="1">
          <LoginPage />
        </TabPane>
        <TabPane tab="Register" key="2">
          <RegisterPage />
        </TabPane>
      </Tabs>
      </Card>
    </div>
  )
}

export default AuthPage
