import { Button, Form, Input, Layout, Alert } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { LoginPayload } from '../authApi'
import { authActions, selectIsLogging } from '../authSlice'


function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLogging = useSelector(selectIsLogging)

  const onFinish = (values: LoginPayload) => {
    dispatch(
      authActions.login({
        data: {
          email: values.email,
          password: values.password,
        },
        onLoginSuccess: () => {
          navigate('../admin', { replace: true })
        },
        onLoginFailture: (msg: string) => {
          setErrorMessage(msg)
        },
      }),
    )
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      {errorMessage && <Alert style={{marginBottom: 18  }} message={errorMessage} type="error" />}
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLogging}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginPage
