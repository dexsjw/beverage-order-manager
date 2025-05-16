import { Key, ReactNode } from "react"

export type SortableTableProps<T> = {
  tableTitle?: string,
  tableHeaders: TableHeader<T>[],
  tableData: T[]
}

export type TableHeader<T> = {
  id: keyof T & Key,
  name: string
}

export type TableData = {
  [key: string | number]: ReactNode
}