import { Controller, useForm } from "react-hook-form"
import { StudentService } from "../../api/services/students"
import * as RadioGroup from '@radix-ui/react-radio-group';

import "./styles.css"

interface Student {
  id: number
  name: string
  startDate: string
  phoneNumber: string
  invoicePayeds: string
  invoiceValue: string
  situation: string
  dayToPay: string
}

interface ModalProps {
  modalIsOpen: boolean
  setRegisterStudentModalIsOpen: (value: React.SetStateAction<boolean>) => void
  setStudentsList: React.Dispatch<React.SetStateAction<Student[]>>
}

export function ModalStudent({ modalIsOpen, setRegisterStudentModalIsOpen, setStudentsList }: ModalProps) {
  
  const { register, handleSubmit, reset, control } = useForm<Student>({
    defaultValues: {
      situation: "Pago"
    }
  })

  function closeModalWithClickInLayer(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target instanceof HTMLDivElement && e.target.className === "modal-layer") {
      setRegisterStudentModalIsOpen(false)
    }
  }

  function handleRegisterNewStudent(data: Student) {
    const { invoiceValue, dayToPay,invoicePayeds, name, startDate, phoneNumber, situation } = data

    const newStudent: Omit<Student, "id"> = {
      invoiceValue,
      invoicePayeds,
      name: name.toLowerCase(), 
      startDate,
      phoneNumber,
      situation,
      dayToPay
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
                htmlFor="phoneNumber">Número:
              </label>
              <input 
                id='phoneNumber' 
                type="text"
                {...register("phoneNumber")} 
              /> 
            </div>

            <div>
              <label 
                htmlFor="dayToPay">Prazo Dias:
              </label>
              <input 
                id='dayToPay' 
                type="number"
                {...register("dayToPay")} 
              /></div> 

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
                htmlFor="invoiceValue">Valor Fatura:
              </label>
              <input 
                id='invoiceValue' 
                type="number"
                {...register("invoiceValue")} 
              />
            </div> 

            <div>
              <Controller
                control={control}
                name="situation"
                render={({ field }) => {
                  return (
                    <RadioGroup.Root className="radio-container" onValueChange={field.onChange} value={field.value}>
                      <RadioGroup.Item className="entry" value="Pago">
                        Pago
                      </RadioGroup.Item>
                      <RadioGroup.Item className="out" value="Vencido">
                        Vencido
                      </RadioGroup.Item>
                    </RadioGroup.Root>
                  )
                }}
              >


              </Controller>
            </div> 
              


            <div>
              
            </div> 

            <button className="register">Cadastrar</button>
              
          </form>
        </div>
      </div>
  )
}

{/* <label 
                htmlFor="invoiceValue">Situação
              </label>
              <input 
                id='invoiceValue' 
                type="text"
                {...register("situation")} 
              /> */}