import { Alert, Button, Form, Input } from 'antd'
import { FormInstance } from 'rc-field-form'
import React, { createRef, useState } from 'react'
import { authApi, RegisterPayload } from '../authApi'

const RegisterPage = () => {
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const form = createRef<FormInstance<RegisterPayload> | any >()

  const onFinish = async (values: RegisterPayload) => {
    try {
      setIsRegistering(true)
      const response = await authApi.register(values)
      if(response.user) {
        alert("Register Success")
        form.current?.resetFields()
      }
    } catch (error: any) {
      setErrorMessage(error?.response.data.msg)
    } finally {
      setIsRegistering(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      {errorMessage && (
        <Alert
          style={{ marginBottom: 18 }}
          message={errorMessage}
          type="error"
        />
      )}
      <Form
        ref={form}
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

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

        <Form.Item wrapperCol={{ offset: 5, span: 17 }}>
          <Button type="primary" htmlType="submit" loading={isRegistering}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterPage
