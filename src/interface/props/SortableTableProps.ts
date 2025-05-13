export interface SortableTableProps<T> {
  tableTitle?: string,
  tableHeaders: TableHeader<T>[],
  tableData: T[]
}

interface TableHeader<T> {
  id: keyof T & string,
  name: string
}