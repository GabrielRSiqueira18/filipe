import { Api } from '../axios';

interface Student {
  id: number
  name: string
  startDate: string
  startTermToPay: string
  daysOfPayment: string
  invoicePayeds: string
  invoiceDueDate: string
  invoiceValue: string
  situation: string

}

async function getAll(): Promise<Student[]> {
  const apiInstance = await Api()

  const { data } = await apiInstance.get("/students")

  return data
}

async function getByName(value: string): Promise<Student[]> {
  const apiInstance = await Api()

  const { data } = await apiInstance.get(`/students/?name_like=${value}`)

  return data
}

async function create(dataCreate: Omit<Student, "id">): Promise<Student> {
  const apiInstance = await Api()

  const { data } = await apiInstance.post("/students", dataCreate)

  return data
}

export const StudentService = {
  getAll,
  getByName,
  create
}