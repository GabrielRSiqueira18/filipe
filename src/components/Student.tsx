import { StudentService } from "../api/services/students"
import { StudentInterface } from "../pages/StudentPage/interfaces"
import "./student.css"
import { Check, X } from "phosphor-react"
import { format } from "date-fns"

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

  const dueDateInDateJS = new Date(dueDate)

  let monthNumber

  switch (monthInEnglishActual) {
    case "january":
      monthNumber = 0;
      break;
    case "february":
      monthNumber = 1;
      break;
    case "march":
      monthNumber = 2;
      break;
    case "april":
      monthNumber = 3;
      break;
    case "may":
      monthNumber = 4;
      break;
    case "june":
      monthNumber = 5;
      break;
    case "july":
      monthNumber = 6;
      break;
    case "august":
      monthNumber = 7;
      break;
    case "september":
      monthNumber = 8;
      break;
    case "october":
      monthNumber = 9;
      break;
    case "november":
      monthNumber = 10;
      break;
    case "december":
      monthNumber = 11;
      break;
    default:
      monthNumber = 0; 
      break;
  }

  dueDateInDateJS.setMonth(monthNumber)

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{phoneNumber}</td>
      <td>{startDate}</td>
      <td>{format(dueDateInDateJS, "dd/MM/yyyy")}</td>
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