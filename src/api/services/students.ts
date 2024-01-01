import { Api } from '../axios';

interface Student {
  id: number
  name: string
  startDate: string
  phoneNumber: string
  invoicePayeds: string
  invoiceValue: string
  situation: string
  dueDate: string
  monthsPayeds: {
    january: boolean,
    february: boolean,
    march: boolean,
    april: boolean,
    may: boolean,
    june: boolean,
    july: boolean,
    august: boolean,
    september: boolean,
    october: boolean,
    november: boolean,
    december: boolean
  }
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
async function edit(id: number, monthEdit: string, status: boolean): Promise<Student> {
  const apiInstance = await Api();

  const originalStudent = (await apiInstance.get(`/students/${id}`)).data;

  originalStudent.monthsPayeds = {
    ...originalStudent.monthsPayeds,
    [monthEdit]: status
  };

  
  const { data } = await apiInstance.put(`/students/${id}`, originalStudent);

  return data;
}

export const StudentService = {
  getAll,
  getByName,
  create,
  edit
}