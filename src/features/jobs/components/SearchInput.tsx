import { Input } from 'antd'
import React, { ChangeEvent, useRef } from 'react'

interface SearchInputProps {
  onChange?: Function
  delay?: number
  name?: string
}

const SearchInput = (props: SearchInputProps) => {
  const tmpRef = useRef<any>()

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {

    if (tmpRef.current) {
      clearTimeout(tmpRef.current)
    }

    tmpRef.current = setTimeout(() => {
      props.onChange && props.onChange(e)
    }, props.delay || 300)
  }

  return (
    <Input.Search
      name={props.name || "input"}
      allowClear
      style={{ width: '40%' }}
      defaultValue=""
      onChange={handleOnChange}
    />
  )
}

export default SearchInput
