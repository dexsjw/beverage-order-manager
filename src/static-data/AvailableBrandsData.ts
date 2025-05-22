import { Beverage } from "../type-interface/Beverage";
import { CustomisationsOption } from "../type-interface/Customisations";
import { BRAND_ONE_PLUS_KOPI, OnePlusKopiCustomisationsOptions, OnePlusKopiMenu } from "./OnePlusKopi";

type BrandData = {
  menu: Beverage[],
  customisationsOptions: CustomisationsOption[]
}

export const AvailableBrandsData: {[key: string]: BrandData} = {
  [BRAND_ONE_PLUS_KOPI]: { menu: OnePlusKopiMenu, customisationsOptions: OnePlusKopiCustomisationsOptions },
  custom: {menu: [{ id: 101, category: "Traditional Coffee", name: "Custom Coffee", price: 1.2 }], customisationsOptions: []}
}

export const AvailableBrands = Object.keys(AvailableBrandsData);