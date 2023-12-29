import { useForm } from "react-hook-form"
import { StudentService } from "../../api/services/students"

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

interface ModalProps {
  modalIsOpen: boolean
  setRegisterStudentModalIsOpen: (value: React.SetStateAction<boolean>) => void
  setStudentsList: React.Dispatch<React.SetStateAction<Student[]>>
}

export function ModalStudent({ modalIsOpen, setRegisterStudentModalIsOpen, setStudentsList }: ModalProps) {
  
  const { register, handleSubmit, reset, control } = useForm<Student>({})

  function closeModalWithClickInLayer(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target instanceof HTMLDivElement && e.target.className === "modal-layer") {
      setRegisterStudentModalIsOpen(false)
    }
  }

  function handleRegisterNewStudent(data: Student) {
    const { daysOfPayment, invoiceDueDate, invoiceValue, invoicePayeds, name, startDate, startTermToPay, situation } = data

    const newStudent: Omit<Student, "id"> = {
      daysOfPayment,
      invoiceDueDate, 
      invoiceValue,
      invoicePayeds,
      name: name.toLowerCase(), 
      startDate,
      startTermToPay,
      situation
    }

    StudentService.create(newStudent)
      .then(result => {
        setStudentsList(state => [...state, result])
      })

    // reset()

    // setRegisterStudentModalIsOpen(false)
  }

  return (
    <div 
        onClick={(e) => closeModalWithClickInLayer(e)}
        className={modalIsOpen ? `modal-layer` : "none"}
      >
        <div 
          className={modalIsOpen ? `modal-students` : "none"}
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
                htmlFor="invoicesPayeds">Faturas Pagas:
              </label>
              <input 
                id='invoicesPayeds' 
                type="number"
                {...register("invoicePayeds")} 
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
            <div>
              <label 
                htmlFor="invoiceValue">Situação
              </label>
              <input 
                id='invoiceValue' 
                type="text"
                {...register("situation")} 
              />
            </div> 

            <button className="register">Cadastrar</button>
              
          </form>
        </div>
      </div>
  )
}