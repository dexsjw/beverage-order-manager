import { Beverage, Customisations } from "../type-interface/Beverage";

export const enum Category {
  HotTraditionalCoffee = "Hot Traditional Coffee",
  IcedTraditionalCoffee = "Iced Traditional Coffee",
  IceBlended = "Ice Blended",
  HotFlowerTea = "Hot Flower Tea",
  SpecialtyIcedDrinks = "Specialty Iced Drinks"
}

export const OnePlusKopiMenu: Beverage[] = [
  { id: 101, category: Category.HotTraditionalCoffee, name: "Kopi O (Hot)", price: 1.2 },
  { id: 102, category: Category.IcedTraditionalCoffee, name: "Kopi O (Iced)", price: 1.5 },
  { id: 103, category: Category.HotTraditionalCoffee, name: "Teh O (Hot)", price: 1.2 },
  { id: 104, category: Category.IcedTraditionalCoffee, name: "Teh O (Iced)", price: 1.5 },
  { id: 105, category: Category.HotTraditionalCoffee, name: "Kopi (Hot)", price: 1.3 },
  { id: 106, category: Category.IcedTraditionalCoffee, name: "Kopi (Iced)", price: 1.8 },
  { id: 107, category: Category.HotTraditionalCoffee, name: "Teh (Hot)", price: 1.3 },
  { id: 108, category: Category.IcedTraditionalCoffee, name: "Teh (Iced)", price: 1.8 },
  { id: 109, category: Category.HotTraditionalCoffee, name: "Kopi C (Hot)", price: 1.5 },
  { id: 110, category: Category.IcedTraditionalCoffee, name: "Kopi C (Iced)", price: 2.0 },
  { id: 111, category: Category.HotTraditionalCoffee, name: "Teh C (Hot)", price: 1.5 },
  { id: 112, category: Category.IcedTraditionalCoffee, name: "Teh C (Iced)", price: 2.0 },
  { id: 113, category: Category.HotTraditionalCoffee, name: "HK Yuan Yang (Hot)", price: 1.8 },
  { id: 114, category: Category.IcedTraditionalCoffee, name: "HK Yuan Yang (Iced)", price: 2.3 },
  { id: 115, category: Category.HotTraditionalCoffee, name: "Milo (Hot)", price: 1.5 },
  { id: 116, category: Category.IcedTraditionalCoffee, name: "Milo (Iced)", price: 2.0 },
  { id: 117, category: Category.HotTraditionalCoffee, name: "Milo C (Hot)", price: 1.6 },
  { id: 118, category: Category.IcedTraditionalCoffee, name: "Milo C (Iced)", price: 2.1 },
  { id: 119, category: Category.HotTraditionalCoffee, name: "Lemon Tea (Hot)", price: 1.5 },
  { id: 120, category: Category.IcedTraditionalCoffee, name: "Lemon Tea (Iced)", price: 1.8 },
  { id: 121, category: Category.HotTraditionalCoffee, name: "Honey Lemon (Hot)", price: 1.8 },
  { id: 122, category: Category.IcedTraditionalCoffee, name: "Honey Lemon (Iced)", price: 2.5 },
  { id: 123, category: Category.HotTraditionalCoffee, name: "YuZu Tea (Hot)", price: 1.8 },
  { id: 124, category: Category.IcedTraditionalCoffee, name: "YuZu Tea (Iced)", price: 2.8 },
  { id: 125, category: Category.IcedTraditionalCoffee, name: "Milo Dino (Iced)", price: 3.2 },
  { id: 126, category: Category.IcedTraditionalCoffee, name: "Milo-Coffee Dino (Iced)", price: 3.2 },
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

export const OnePlusKopiCustomisations = {
  // OnePlusKopi take away for hot drinks need to +$0.10 ~ $0.20
  isTakeAway: [true, false],
  thicknessLevel: ["Di Lo (Thickest)", "Gao (Thicker)", "Po (Thinner)"],
  sweetnessLevel: ["Ga Dai (Sweeter)", "Siu Dai (Less Sweet)", "Siu Siu Dai (Less Less Sweet)", "Kosong (No sugar)"],
  others: null
}