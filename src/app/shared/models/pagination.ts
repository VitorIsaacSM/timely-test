export interface Pagination<T> {
  from: number
  has_next: boolean
  has_prior: boolean
  items: T
  size: number
  total: number
}
