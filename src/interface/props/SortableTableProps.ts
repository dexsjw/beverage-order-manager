import { Key } from "react"

export interface SortableTableProps<T> {
  tableTitle?: string,
  tableHeaders: TableHeader<T>[],
  tableData: T[]
}

interface TableHeader<T> {
  id: keyof T & Key,
  name: string
}