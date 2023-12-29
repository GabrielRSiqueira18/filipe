export interface ProductInterface {
    id: string
    date: string
    description: string
    month: string
    pricePerUnit: number
    quantity: number
    totalValue: number
    type: "Entrada" | "Saída"
  }

export interface ProductQuerySearch {
    value: string
  }
  