import { useState } from "react"
import { Student } from "../../components/Student"
import "./style.css"

export function StudentPage() {
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
            <h2>Total Vbvalores Alunos</h2>
            <p>Janeiro</p>
            <p className='money'>R$ 1000.00</p>
          </div>
        </div>
      </header>

      <div className='students-container'>
        <header className='students-header'>
          <button onClick={() => setRegisterStudentModalIsOpen(true)}>Adicionar Aluno</button>
          <button>Financeiro</button>
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
              <Student
                id="001"
                name='Gabriel Ribeiro Siqueira2'
                daysOfPayment='30'
                incoiceDueDate='30'
                invoiceValue='30'
                lasyDayToPay='20/01/2024'
                startDate='01/12/2023'
                startTermToPay='10/12/2023'
                key={0}
              />

              <tr>
                <td>001</td>
                <td>Gabriel Ribeiro Siqueira</td>
                <td>20/12/2032</td>
                <td>01/01/2024</td>
                <td>30</td>
                <td>01/02/2024</td>
                <td>30</td>
                <td>30</td>
                <td>3</td>
                <td>OK</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}