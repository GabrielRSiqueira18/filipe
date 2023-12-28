import { Api } from '../axios';

interface Product {
  id: string
  date: string
  description: string
  month: string
  pricePerUnit: number
  quantity: number
  totalValue: number
  type: "Entrada" | "Saída"
}

async function getAll(): Promise<Product[]> {
  const apiInstance = await Api()

  const { data } = await apiInstance.get("/products")

  return data

}
async function create(dataCreate: Omit<Product, "id">): Promise<Product> {
  const apiInstance = await Api()

  const { data } = await apiInstance.post("/products", dataCreate)

  return data
}

export const ProductsService = {
  getAll,
  create
}