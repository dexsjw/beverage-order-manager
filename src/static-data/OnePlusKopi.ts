import { Beverage } from "../type-interface/Beverage";
import { CustomisationsOption } from "../type-interface/Customisations";

export const BRAND_ONE_PLUS_KOPI = "One Plus Kopi";

export const enum Category {
  HotTraditionalCoffee = "Hot Traditional Coffee",
  IcedTraditionalCoffee = "Iced Traditional Coffee",
  IceBlended = "Ice Blended",
  HotFlowerTea = "Hot Flower Tea",
  SpecialtyIcedDrinks = "Specialty Iced Drinks"
}

export const OnePlusKopiMenu: Beverage[] = [
  { id: 101, category: Category.HotTraditionalCoffee, name: "(Hot) Kopi O", price: 1.2 },
  { id: 102, category: Category.IcedTraditionalCoffee, name: "(Iced) Kopi O", price: 1.5 },
  { id: 103, category: Category.HotTraditionalCoffee, name: "(Hot) Teh O", price: 1.2 },
  { id: 104, category: Category.IcedTraditionalCoffee, name: "(Iced) Teh O", price: 1.5 },
  { id: 105, category: Category.HotTraditionalCoffee, name: "(Hot) Kopi", price: 1.3 },
  { id: 106, category: Category.IcedTraditionalCoffee, name: "(Iced) Kopi", price: 1.8 },
  { id: 107, category: Category.HotTraditionalCoffee, name: "(Hot) Teh", price: 1.3 },
  { id: 108, category: Category.IcedTraditionalCoffee, name: "(Iced) Teh", price: 1.8 },
  { id: 109, category: Category.HotTraditionalCoffee, name: "(Hot) Kopi C", price: 1.5 },
  { id: 110, category: Category.IcedTraditionalCoffee, name: "(Iced) Kopi C", price: 2.0 },
  { id: 111, category: Category.HotTraditionalCoffee, name: "(Hot) Teh C", price: 1.5 },
  { id: 112, category: Category.IcedTraditionalCoffee, name: "(Iced) Teh C", price: 2.0 },
  { id: 113, category: Category.HotTraditionalCoffee, name: "(Hot) HK Yuan Yang", price: 1.8 },
  { id: 114, category: Category.IcedTraditionalCoffee, name: "(Iced) HK Yuan Yang", price: 2.3 },
  { id: 115, category: Category.HotTraditionalCoffee, name: "(Hot) Milo", price: 1.5 },
  { id: 116, category: Category.IcedTraditionalCoffee, name: "(Iced) Milo", price: 2.0 },
  { id: 117, category: Category.HotTraditionalCoffee, name: "(Hot) Milo C", price: 1.6 },
  { id: 118, category: Category.IcedTraditionalCoffee, name: "(Iced) Milo C", price: 2.1 },
  { id: 119, category: Category.HotTraditionalCoffee, name: "(Hot) Lemon Tea", price: 1.5 },
  { id: 120, category: Category.IcedTraditionalCoffee, name: "(Iced) Lemon Tea", price: 1.8 },
  { id: 121, category: Category.HotTraditionalCoffee, name: "(Hot) Honey Lemon", price: 1.8 },
  { id: 122, category: Category.IcedTraditionalCoffee, name: "(Iced) Honey Lemon", price: 2.5 },
  { id: 123, category: Category.HotTraditionalCoffee, name: "(Hot) YuZu Tea", price: 1.8 },
  { id: 124, category: Category.IcedTraditionalCoffee, name: "(Iced) YuZu Tea", price: 2.8 },
  { id: 125, category: Category.IcedTraditionalCoffee, name: "(Iced) Milo Dino", price: 3.2 },
  { id: 126, category: Category.IcedTraditionalCoffee, name: "(Iced) Milo-Coffee Dino", price: 3.2 },
  { id: 201, category: Category.IceBlended, name: "Coffee / Mocha", price: 4.5 },
  { id: 202, category: Category.IceBlended, name: "Cookie + Cream", price: 4.5 },
  { id: 203, category: Category.IceBlended, name: "Matcha + Milk", price: 4.5 },
  { id: 204, category: Category.IceBlended, name: "Mixed Berries", price: 4.5 },
  { id: 205, category: Category.IceBlended, name: "Lychee", price: 4.5 },
  { id: 206, category: Category.IceBlended, name: "Mango", price: 4.5 },
  { id: 207, category: Category.IceBlended, name: "Passion Fruit", price: 4.5 },
  { id: 208, category: Category.IceBlended, name: "Honey YuZu", price: 4.5 },
  { id: 301, category: Category.HotFlowerTea, name: "Chrysanthemum Goji", price: 1.6 },
  { id: 302, category: Category.HotFlowerTea, name: "Rose Goji", price: 1.6 },
  { id: 303, category: Category.HotFlowerTea, name: "Honey BlackFruit Wolfberry", price: 1.8 },
  { id: 401, category: Category.SpecialtyIcedDrinks, name: "Lychee Tea", price: 2.8 },
  { id: 402, category: Category.SpecialtyIcedDrinks, name: "Honey Passion Fruit", price: 3.0 },
  { id: 403, category: Category.SpecialtyIcedDrinks, name: "Lychee Aloe Vera", price: 3.5 },
  { id: 404, category: Category.SpecialtyIcedDrinks, name: "Honey Lemon Aloe Vera", price: 3.5 }
]

// OnePlusKopi take away for hot drinks need to +$0.10 ~ $0.20
export const OnePlusKopiCustomisationsOptions: CustomisationsOption[] = [
  {
    id: "isTakeAway",
    name: "Take Away?",
    label: "Yes / No",
    placeholder:"Yes", 
    booleanOptions: [true, false]
  },
  {
    id: "thicknessLevel",
    name: "Thickness Level",
    label: "Thickness",
    placeholder:"Normal", 
    stringOptions: ["Normal", "Po (Thinner)", "Gao (Thicker)", "Di Lo (Thickest)"]
  },
  {
    id: "sweetnessLevel",
    name: "Sweetness Level",
    label: "Sweetness",
    placeholder:"Normal", 
    stringOptions: ["Normal", "Kosong (No sugar)", "Siu Siu Dai (Less Less Sweet)", "Siu Dai (Less Sweet)", "Ga Dai (Sweeter)"]
  }
]