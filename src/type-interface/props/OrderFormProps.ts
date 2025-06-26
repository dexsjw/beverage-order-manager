import { Order } from "../Order";

export type OrderFormProps = {
  selectedBrandIndex: number,
  isEditMode: boolean,
  handleAddOrder: (order: Order) => void,
  handleUpdateOrder: (order: Order) => void,
  handleRemoveOrder: (orderId: string) => void
}