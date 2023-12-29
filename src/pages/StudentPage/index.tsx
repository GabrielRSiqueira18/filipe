import "./style.css"

import { useEffect, useState } from "react"
import { Student } from "../../components/Student"
import { NavLink } from "react-router-dom"
import { StudentService } from "../../api/services/students";
import ReactPaginate from "react-paginate";
import { ModalStudent } from "../../components/ModalStudent";
import { ReactPaginateOnPageChangeEvent, StudentInterface } from "./interfaces/index"
import { FormFilter } from "./components/FormFilter";
import { formatDate } from "./utils/formatDate";

export function StudentPage() {
  const [ studentsList, setStudentsList ] = useState<StudentInterface[]>([])
  const [ registerStudentModalIsOpen, setRegisterStudentModalIsOpen ] = useState(false)

  //Pagination
  const [ pageNumber, setPageNumber ] = useState(0)
  const productPerPage = 10
  const pageVisited = pageNumber * productPerPage
  const pageCount = Math.ceil(studentsList.length / productPerPage)

  async function getAllStudents() {
    StudentService.getAll()
      .then((products) => {
        setStudentsList(products)
      })
  }

  //Display students in pagination
  const displayStudents = studentsList.slice(pageVisited, pageVisited + productPerPage).map(student => {
    return (
      <Student
        key={student.id}
        id={student.id}
        name={student.name.toUpperCase()}
        daysOfPayment={student.daysOfPayment}
        invoiceDueDate={student.invoiceDueDate}
        invoiceValue={student.invoiceValue}
        invoicesPayeds={student.invoicePayeds}
        situation={student.situation}

        startDate={formatDate(student.startDate)}
        startTermToPay={formatDate(student.startTermToPay)}
      />
    )
  })

  //Get students data in DB server
  useEffect(() => {
    getAllStudents()
  }, [])
  
  function changePage(event: ReactPaginateOnPageChangeEvent) {
    setPageNumber(event.selected)
  }

  //Adjust values 
  const totalValues = studentsList.reduce((finalValue, innitialValue) => {
    const value = Number(innitialValue.invoiceValue) * Number(innitialValue.invoicePayeds) 
    return finalValue += value
  }, 0)
  console.log(totalValues)

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  //Situations
  const situationOk = studentsList.filter(student => student.situation === "Ok").length
  const situationDue = studentsList.filter(student => student.situation === "Vencida").length
  const situationRenew = studentsList.filter(student => student.situation === "Renovar").length

  return(
    <>
      <ModalStudent
        modalIsOpen={registerStudentModalIsOpen }
        setRegisterStudentModalIsOpen={setRegisterStudentModalIsOpen}
        setStudentsList={setStudentsList}
      />

      <header className='header'>
        <div className='container-header'>
        <div className='container-students-situation'>
            <h2>Alunos:</h2>
            <p className='ok'>OK: <span>{situationOk}</span></p>
            <p className='renew'>Renovar: <span>{situationDue}</span></p>
            <p className='overdue'>Vencido: <span>{situationRenew}</span></p>
          </div>
          <div className='container-total-values-students'>
            <h2>Total Valores Alunos</h2>
            <p className='money'>{formatter.format(totalValues)}</p>
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

        <FormFilter 
          studentsList={studentsList}
          setStudentsList={setStudentsList}
        />  

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
            previousLabel="Anterior"
            nextLabel="Próximo"
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination-container"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    </>
  )
}