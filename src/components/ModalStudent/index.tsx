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
    const { invoiceValue, invoicePayeds, name, startDate, phoneNumber, situation, dueDate } = data

    const monthsPayeds = {
      january: false,
      february: false,
      march: false,
      april: false,
      may: false,
      june: false,
      july: false,
      august: false,
      september: false,
      october: false,
      november: false,
      december: false
    }

    const newStudent: Omit<Student, "id"> = {
      invoiceValue,
      invoicePayeds,
      name: name.toLowerCase(), 
      startDate,
      phoneNumber,
      situation,
      dueDate,
      monthsPayeds: monthsPayeds
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
                htmlFor="phoneNumber">Número P/ Contato:
              </label>
              <input 
                id='phoneNumber' 
                type="text"
                {...register("phoneNumber")} 
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
                htmlFor="dueDate">Vencimento da Fatura:
              </label>
              <input 
                id='dueDate' 
                type="date"
                {...register("dueDate")} 
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