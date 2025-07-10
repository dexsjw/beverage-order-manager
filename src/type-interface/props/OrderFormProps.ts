import { Order } from "../Order";

export type OrderFormProps = {
  selectedBrandIndex: number,
  orderToEdit: Order | null,
  exitEditMode: () => void,
  handleAddOrder: (order: Order) => void,
  handleUpdateOrder: (order: Order) => void,
  handleRemoveOrder: (orderId: string) => void
}