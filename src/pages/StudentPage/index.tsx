import { useEffect, useState } from "react"
import { Student } from "../../components/Student"
import "./style.css"
import { NavLink } from "react-router-dom"
import { useForm } from "react-hook-form";
import { StudentService } from "../../api/services/students";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

interface Student {
  id: number
  name: string
  startDate: string
  startTermToPay: string
  daysOfPayment: string
  lasyDayToPay: string
  invoiceDueDate: string
  invoiceValue: string
}

export function StudentPage() {
  const { register, handleSubmit, reset, control } = useForm<Student>({})
  const [ studentsList, setStudentsList ] = useState<Student[]>([])

  const [ registerStudentModalIsOpen, setRegisterStudentModalIsOpen ] = useState(false)

  function cloneModalWithClickInLayer(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target instanceof HTMLDivElement && e.target.className === "modal-layer") {
      setRegisterStudentModalIsOpen(false)
    }
  }

  function handleRegisterNewStudent(data: Student) {
    const { daysOfPayment, invoiceDueDate, invoiceValue, lasyDayToPay, name, startDate, startTermToPay } = data

    const newStudent: Omit<Student, "id"> = {
      daysOfPayment,
      invoiceDueDate, 
      invoiceValue,
      lasyDayToPay,
      name, 
      startDate,
      startTermToPay
    }

    StudentService.create(newStudent)
      .then(result => {
        setStudentsList(state => [...state, result])
      })

    reset()

    setRegisterStudentModalIsOpen(false)
  }

  useEffect(() => {
    StudentService.getAll()
      .then((products) => {
        setStudentsList(products)
      })
  }, [])

  return(
    <>
      <div 
        onClick={(e) => cloneModalWithClickInLayer(e)}
        className={registerStudentModalIsOpen ? `modal-layer` : "none"}
      >
        <div 
          className={registerStudentModalIsOpen ? `modal` : "none"}
        >
          <header>
            <button>Cadastrar</button>
            <button onClick={() => setRegisterStudentModalIsOpen(false)}>X</button>
          </header>
          <form onSubmit={handleSubmit(handleRegisterNewStudent)}>
            <div>
              <label 
                htmlFor="name">
                  Nome do Aluno:
              </label>
              <input 
                id='name' 
                type="text"
                {...register("name")} 
              /> 
            </div>

            <div>
              <label 
                htmlFor="startDate">Data do Início do Aluno:
              </label>
              <input 
                id='startDate' 
                type="date"
                {...register("startDate")} 
              />
            </div>

            <div>
              <label 
                htmlFor="startTermToPay">Início Prazo para Pagar:
              </label>
              <input 
                id='startTermToPay' 
                type="date"
                {...register("startTermToPay")} 
              /> 
            </div>

            <div>
              <label 
                htmlFor="daysOfPayment">Prazo dias do Pagamento:
              </label>
              <input 
                id='daysOfPayment' 
                type="number"
                {...register("daysOfPayment")} 
              /> 
            </div>

            <div>
              <label 
                htmlFor="lasyDayToPay">Fim Prazo para Pagar:
              </label>
              <input 
                id='lasyDayToPay' 
                type="date"
                {...register("lasyDayToPay")} 
              /></div> 

            <div>
              <label 
                htmlFor="incoiceDueDate">Dias para Vencer Fatura:
              </label>
              <input 
                id='incoiceDueDate'
                type="number"
                {...register("invoiceDueDate")} 
              /></div> 

            <div>
              <label 
                htmlFor="invoiceValue">Valor Fatura:
              </label>
              <input 
                id='invoiceValue' 
                type="number"
                {...register("invoiceValue")} 
              />
            </div> 

            <button className="register">Cadastrar</button>
              
          </form>
        </div>
      </div>

      <header className='header'>
        <div className='container-header'>
        <div className='container-students-situation'>
            <h2>Alunos:</h2>
            <p className='ok'>OK: <span>0</span></p>
            <p className='renew'>Renovar: <span>0</span></p>
            <p className='overdue'>Vencido: <span>0</span></p>
          </div>
          <div className='container-total-values-students'>
            <h2>Total Valores Alunos</h2>
            <p>Janeiro</p>
            <p className='money'>R$ 1000.00</p>
          </div>
        </div>
      </header>

      <div className='students-container'>
        <header className='students-header'>
          <button onClick={() => setRegisterStudentModalIsOpen(true)}>Adicionar Aluno</button>
          <NavLink to={"/financeiro"}>
            <button>Financeiro</button>
          </NavLink>
        </header>

        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Aluno</th>
                <th>Data Início</th>
                <th>Prazo p/ Pagar</th>
                <th>Prazo Dias</th>
                <th>Fim Prazo</th>
                <th>Dias a Vencer</th>
                <th>Valor</th>
                <th>Faturas Pagas</th>
                <th>Situação</th>
              </tr>
            </thead>
            <tbody>
              {studentsList.map(student => {
                return (
                  <Student
                    key={student.id}
                    id={student.id}
                    name={student.name}
                    daysOfPayment={student.daysOfPayment}
                    invoiceDueDate={student.invoiceDueDate}
                    invoiceValue={student.invoiceValue}
                    lasyDayToPay={formatDate(student.lasyDayToPay)}
                    startDate={formatDate(student.startDate)}
                    startTermToPay={formatDate(student.startTermToPay)}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}