import { Order } from "../Order";

export type OrderFormProps = {
  selectedBrandIndex: number,
  isEditMode: boolean,
  handleExitEditMode: () => void,
  handleAddOrder: (order: Order) => void,
  handleRemoveOrder: (orderId: string) => void
}