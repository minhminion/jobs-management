import React, { useEffect, useState } from 'react';
import { ListParams } from '../../../models';
import { jobApi } from '../jobApi';





const JobsPage = () => {

  const [jobList, setJobList] = useState()
  const [filterParams, setFilterParams] = useState<ListParams>({
    _page: 1,
    _limit: 10,
    _order: 'asc',
    _sort: 'id'
  })



  useEffect(() => {
    async function fetchAllJob (params: ListParams) {
      try {
        const response = await jobApi.getAll(params)
      } catch (error) {
        
      }
    }

    fetchAllJob(filterParams)

  }, [filterParams])


  return (
    <div>
      Job List Pages
    </div>
  )
}

export default JobsPage