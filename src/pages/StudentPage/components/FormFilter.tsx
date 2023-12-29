import { useForm } from "react-hook-form"
import { StudentInterface, StudentQuerySearch } from "../interfaces"
import { StudentService } from "../../../api/services/students"
import { useState } from "react"
import { sortStudentAlphabetic, sortStudentByInvoice } from "../utils/sortsFunctions"

interface FormFilterProps {
  studentsList: StudentInterface[]
  setStudentsList: React.Dispatch<React.SetStateAction<StudentInterface[]>>
}

export function FormFilter({ studentsList, setStudentsList }: FormFilterProps) {
  const { register, handleSubmit } = useForm<StudentQuerySearch>({})

  const [ studentsIsSortedAlphabeticAToZ, setStudentsIsSortedAlphabeticAToZ ] = useState(false)
  const [ studentsIsSortedInvoiceBigger, setStudentsIsSortedInvoiceBigger ] = useState(false)

  async function handleSubmitSearchByName({ value }: { value: string }) {
    StudentService.getByName(value.toLowerCase())
      .then(students => setStudentsList(students))
  }

  async function getAllStudents() {
    StudentService.getAll()
      .then((products) => {
        setStudentsList(products)
      })
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitSearchByName)} className="form-filter">
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Pesquise por um produto" 
          {...register("value")}
        />
        <button>Pesquisar</button>
        <button type="reset" onClick={() => getAllStudents()}>Limpar</button>
      </div>

      <div className="button-container">
        <button onClick={() => sortStudentAlphabetic({ studentsIsSortedAlphabeticAToZ, studentsList, setStudentsIsSortedAlphabeticAToZ, setStudentsList })} type="button">A-Z</button>
        <button onClick={() => sortStudentByInvoice({ studentsList, studentsIsSortedInvoiceBigger, setStudentsIsSortedInvoiceBigger, setStudentsList })} type="button">Faturas paga maior e menor </button>
        <button type="button">Situação</button>
      </div>
    </form>
  )
}