import { authHeader, axiosClient } from '../../api/axiosClient'
import { ListParams, ListResponse } from '../../models'
import { Job } from '../../models/job'

export const jobApi = {
  getAll(params: ListParams): Promise<ListResponse<Job>> {
    const url = '/jobs'
    return axiosClient.get(url, { headers: authHeader(), params })
  },
  add(params: Job): Promise<Job> {
    const url = '/jobs'
    return axiosClient.post(url, params, { headers: authHeader() })
  },
}
