import { Button, Table, TablePaginationConfig } from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ListParams, PaginationParams } from '../../../models'
import { Job } from '../../../models/job'
import AddNewJobModal from '../components/AddNewJobModal'
import SearchInput from '../components/SearchInput'
import { jobApi } from '../jobApi'

const columns = [
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
  },
]

const LIMIT_PER_PAGE = 6

const JobsPage = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [jobList, setJobList] = useState<Job[]>()
  const [pagination, setPagination] = useState<PaginationParams>({
    totalPage: 0,
    items: 0,
    currentPage: 0,
  })
  const [filterParams, setFilterParams] = useState<ListParams>({
    page: 1,
    limit: LIMIT_PER_PAGE,
  })

  useEffect(() => {
    async function fetchAllJob(params: ListParams) {
      try {
        setIsLoading(true)
        const response = await jobApi.getAll(params)
        setJobList(response.result)
        setPagination({
          totalPage: response.totalPage,
          items: response.items,
          currentPage: response.currentPage,
        })
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllJob(filterParams)
  }, [filterParams])

  function handleOnTableChange(pagination: TablePaginationConfig) {
    setFilterParams((prev: ListParams) => ({
      ...prev,
      page: Number(pagination.current),
    }))
  }

  function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setFilterParams((prev: ListParams) => ({
      ...prev,
      page: 1,
      [e.target.name]: e.target.value,
    }))
  }

  async function addNewJob(values: Job) {
    try {
      await jobApi.add(values)
      setIsOpenAddModal(false)
      setFilterParams((prev) => ({
        ...prev,
      }))
      toast.success('Add new job success')
    } catch (error) {
    } finally {
      return true
    }
  }

  return (
    <div>
      <AddNewJobModal
        visible={isOpenAddModal}
        handleOk={addNewJob}
        handleCancel={() => setIsOpenAddModal(false)}
      />
      <SearchInput name="company" delay={500} onChange={handleSearchInput} />
      <Button type="primary" onClick={() => setIsOpenAddModal(true)}>
        {' '}
        Add Job{' '}
      </Button>
      <Table
        loading={isLoading}
        dataSource={jobList}
        columns={columns}
        onChange={handleOnTableChange}
        pagination={{
          pageSize: filterParams.limit,
          current: pagination?.currentPage,
          total: pagination.items,
        }}
        style={{ height: '100%' }}
      />
    </div>
  )
}

export default JobsPage
