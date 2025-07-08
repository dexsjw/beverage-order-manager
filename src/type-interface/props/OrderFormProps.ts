import { Order } from "../Order";

export type OrderFormProps = {
  selectedBrandIndex: number,
  editMode: { isEdit: boolean, selectedOrderId: string },
  exitEditMode: () => void,
  handleAddOrder: (order: Order) => void,
  handleUpdateOrder: (order: Order) => void,
  handleRemoveOrder: (orderId: string) => void
}