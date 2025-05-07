export interface SortableTableProps<T> {
  tableTitle?: string,
  tableHeaders: { id: string, name: string }[],
  tableData: T[]
}