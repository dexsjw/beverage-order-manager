import { Key } from "react"

export type SortableTableProps<T> = {
  tableTitle?: string,
  tableHeaders: TableHeader<T>[],
  tableData: T[],
  onRowSelect: (rowId: Key) => void
}

export type TableHeader<T> = {
  id: keyof T & Key,
  name: string
}