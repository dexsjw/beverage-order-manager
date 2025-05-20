import { Beverage } from "../type-interface/Beverage";
import { BRAND_ONE_PLUS_KOPI, OnePlusKopiMenu } from "./OnePlusKopi";

export const AvailableBrandsMenu: {[key: string]: Beverage[]} = {
  [BRAND_ONE_PLUS_KOPI]: OnePlusKopiMenu,
  custom: [{ id: 101, category: "Traditional Coffee", name: "Custom Coffee", price: 1.2 }]
}

export const AvailableBrands: string[] = [
  BRAND_ONE_PLUS_KOPI,
  "custom"
]