import "./style.css"

import { useEffect, useState } from "react"
import { Student } from "../../components/Student"
import { NavLink } from "react-router-dom"
import { StudentService } from "../../api/services/students";
import ReactPaginate from "react-paginate";
import { Modal } from "../../components/ModalStudent";

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
  const [ studentsList, setStudentsList ] = useState<Student[]>([])
  const [ registerStudentModalIsOpen, setRegisterStudentModalIsOpen ] = useState(false)

  const [ pageNumber, setPageNumber ] = useState(0)
  const productPerPage = 10
  const pageVisited = pageNumber * productPerPage

  //Display students in pagination
  const displayStudents = studentsList.slice(pageVisited, pageVisited + productPerPage).map(student => {
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
  })

  //Get students data in db server
  useEffect(() => {
    StudentService.getAll()
      .then((products) => {
        setStudentsList(products)
      })
  }, [])
  
  //Pagination
  const pageCount = Math.ceil(studentsList.length / productPerPage)

  function changePage(event: any) {
    setPageNumber(event.selected)
  }

  return(
    <>
      <Modal
        modalIsOpen={registerStudentModalIsOpen }
        setRegisterStudentModalIsOpen={setRegisterStudentModalIsOpen}
        setStudentsList={setStudentsList}
      />

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
        <form className="form-filter">
          <div className="input-container">
            <input type="text" placeholder="Pesquise por um produto" />
            <button>Pesquisar</button>
          </div>

          <div className="button-container">
            <button type="button">A-Z</button>
            <button type="button">Faturas paga maior e menor </button>
            <button type="button">Situação</button>
          </div>
        </form>

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
              {displayStudents}
            </tbody>
          </table>

          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={pageCount}
            onPageChange={changePage}
          />
        </div>
      </div>
    </>
  )
}