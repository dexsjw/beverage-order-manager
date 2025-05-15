import { Key, ReactNode } from "react"

export interface SortableTableProps<T> {
  tableTitle?: string,
  tableHeaders: TableHeader<T>[],
  tableData: T[]
}

export interface TableHeader<T> {
  id: keyof T & Key,
  name: string,
  renderCell?: (value: T[keyof T]) => ReactNode
}