import { useState } from "react"
import "./style.css"

export function FinancialPage() {
  const [ registerStudentModalIsOpen, setRegisterStudentModalIsOpen ] = useState(false)

  function cloneModalWithClickInLayer(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target instanceof HTMLDivElement && e.target.className === "modal-layer") {
      setRegisterStudentModalIsOpen(false)
    }
  }

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
          <form>
            <label 
              htmlFor="name">
                Nome do Aluno:
            </label>
            <input 
              id='name' 
              type="text" 
            /> 

            <label 
              htmlFor="startDate">Data do Início do Aluno:
            </label>
            <input 
              id='startDate' 
              type="date" 
            />

            <label 
              htmlFor="startTermToPay">Início Prazo para Pagar:
            </label>
            <input 
              id='startTerToPay' 
              type="date" 
            /> 

            <label 
              htmlFor="daysOfPayment">Prazo dias do Pagamento:
            </label>
            <input 
              id='daysOfPayment' 
              type="number" 
            /> 

            <label 
              htmlFor="lasyDayToPay">Fim Prazo para Pagar:
            </label>
            <input 
              id='lasyDayToPay' 
              type="date" 
            /> 

            <label 
              htmlFor="incoiceDueDate">Dias para Vencer Fatura:
            </label>
            <input 
              id='incoiceDueDate'
              type="number" 
            /> 

            <label 
              htmlFor="invoiceValue">Valor Fatura:
            </label>
            <input 
              id='invoiceValue' 
              type="number" 
            /> 

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
    </>
  )
}