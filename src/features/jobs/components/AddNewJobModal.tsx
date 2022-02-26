import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { Job } from '../../../models/job'

interface AddNewJobModalProps {
  title?: string
  visible?: boolean
  handleOk?: any
  handleCancel?: any
  confirmLoading?: boolean
}

const AddNewJobModal = (props: AddNewJobModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const [form] = Form.useForm()

  async function onFinish(values: Job) {
    setIsLoading(true)
    props.handleOk && (await props.handleOk(values))
    form.resetFields()
    setIsLoading(false)
  }

  return (
    <Modal
      title={props.title || 'Add new jobs'}
      visible={props.visible || false}
      onOk={() => form.submit()}
      confirmLoading={isLoading}
      onCancel={props.handleCancel || undefined}
      okText="Submit"
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Company"
          name="company"
          rules={[{ required: true, message: 'Please input Company!' }]}
        >
          <Input placeholder="input placeholder" required />
        </Form.Item>
        <Form.Item
          label="Position"
          name="position"
          rules={[{ required: true, message: 'Please input Position!' }]}
        >
          <Input placeholder="input placeholder" required />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddNewJobModal
