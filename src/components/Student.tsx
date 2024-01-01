import { useEffect } from "react"
import { StudentService } from "../api/services/students"
import { StudentInterface } from "../pages/StudentPage/interfaces"
import "./student.css"
import { Check, X } from "phosphor-react"

interface StudentProps {
  id: number
  name: string
  startDate: string
  phoneNumber: string
  invoiceValue: string
  invoicesPayeds: string
  situation: string
  dueDate: string
  monthsPayeds: {
    [key: string]: boolean; // Index signature allows string keys
  }
  monthInEnglishActual: string
  setStudentsList: React.Dispatch<React.SetStateAction<StudentInterface[]>>
}

export function Student({ id, name, startDate, phoneNumber ,invoiceValue, invoicesPayeds, situation, dueDate, monthsPayeds, monthInEnglishActual, setStudentsList }: StudentProps) {

  async function handleEditMonthPayedToNo(id: number, monthEdit: string, status: boolean) {
    await StudentService.edit(id, monthEdit, status)

    StudentService.getAll()
      .then((students) => {
        setStudentsList(students)
      })
  }


  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{phoneNumber}</td>
      <td>{startDate}</td>
      <td>{dueDate}</td>
      <td>
        <div>
          {monthsPayeds[monthInEnglishActual] ? "Sim" : "Não"}
          <div className="container-buttons-ispayed">
            <button onClick={() => handleEditMonthPayedToNo(id, monthInEnglishActual, true)}><Check color="#15803d" size={14} /></button>
            <button onClick={() => handleEditMonthPayedToNo(id, monthInEnglishActual, false)}><X color="#b91c1c" size={14} /></button>
          </div>
        </div>
      </td>
      <td>{invoiceValue}</td>
      <td>{invoicesPayeds}</td>
      <td className={`${situation === "Pago" ? "ok-2" : "late"}`}>
        {situation}
      </td>
    </tr>
)
}