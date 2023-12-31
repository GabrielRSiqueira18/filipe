import "./style.css"

import { useEffect, useState } from "react"
import { Student } from "../../components/Student"
import { NavLink } from "react-router-dom"
import { StudentService } from "../../api/services/students";
import ReactPaginate from "react-paginate";
import { ModalStudent } from "../../components/ModalStudent";
import { ReactPaginateOnPageChangeEvent, StudentInterface, StudentQuerySearch } from "./interfaces/index"
import { formatDate } from "../../utils/formatDate";
import { useForm } from "react-hook-form";
import { formatter } from "../../utils/formatterValueToBRL";

export function StudentPage() {
  const [ studentsList, setStudentsList ] = useState<StudentInterface[]>([])
  const [ registerStudentModalIsOpen, setRegisterStudentModalIsOpen ] = useState(false)

  //Pagination
  const [ pageNumber, setPageNumber ] = useState(0)
  const productPerPage = 10
  const pageVisited = pageNumber * productPerPage
  const pageCount = Math.ceil(studentsList.length / productPerPage)

  function changePage(event: ReactPaginateOnPageChangeEvent) {
    setPageNumber(event.selected)
  }

  const displayStudents = studentsList.slice(pageVisited, pageVisited + productPerPage).map(student => {
    return (
      <Student
        key={student.id}
        id={student.id}
        name={student.name.toUpperCase()}
        invoiceValue={student.invoiceValue}
        invoicesPayeds={student.invoicePayeds}
        situation={student.situation}
        dayToPay={student.dayToPay}

        startDate={formatDate(student.startDate)}
        phoneNumber={formatDate(student.phoneNumber)}
      />
    )
  })

  //Get Students in DB
  async function getAllStudents() {
    StudentService.getAll()
      .then((students) => {
        setStudentsList(students)
      })
  }  

  
  useEffect(() => {
    getAllStudents()
  }, [])
  
  //Adjust values 
  const totalValues = studentsList.reduce((finalValue, innitialValue) => {
    const value = Number(innitialValue.invoiceValue) * Number(innitialValue.invoicePayeds) 
    return finalValue += value
  }, 0)

  //Situations
  const situationOk = studentsList.filter(student => student.situation === "Paga").length
  const situationDue = studentsList.filter(student => student.situation === "Vencida").length

  const { register, handleSubmit } = useForm<StudentQuerySearch>({})

  const [ studentsIsSortedAlphabeticAToZ, setStudentsIsSortedAlphabeticAToZ ] = useState(false)
  const [ studentsIsSortedInvoiceBigger, setStudentsIsSortedInvoiceBigger ] = useState(false)

  //Form Filter
  async function handleSubmitSearchByName({ value }: { value: string }) {
    StudentService.getByName(value.toLowerCase())
      .then(students => setStudentsList(students))
  }

  function sortStudentAlphabetic() {
    if(studentsIsSortedAlphabeticAToZ == false) {
      setStudentsList(studentsList.sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())))
      setStudentsIsSortedAlphabeticAToZ(true)
    } else {
      setStudentsList(studentsList.sort((a, b) => b.name.toUpperCase().localeCompare(a.name.toUpperCase())))
      setStudentsIsSortedAlphabeticAToZ(false)
    }
  }

  function sortStudentByInvoice() {
    if(studentsIsSortedInvoiceBigger == false) {
      setStudentsList(studentsList.sort((a, b) => Number(a.invoicePayeds) - Number(b.invoicePayeds)))
      setStudentsIsSortedInvoiceBigger(true)
    } else {
      setStudentsList(studentsList.sort((a, b) => Number(b.invoicePayeds) - Number(a.invoicePayeds)))
      setStudentsIsSortedInvoiceBigger(false)
    }
  }

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
            <p className='ok'>{situationOk > 1 ? "Pagos" : "Pago"}: <span>{situationOk}</span></p>
            <p className='overdue'>{situationDue > 1 ? "Vencidos" : "Vencido"}: <span>{situationDue}</span></p>
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

        <form onSubmit={handleSubmit(handleSubmitSearchByName)} className="form-filter">
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Pesquise por um produto" 
          {...register("value")}
        />
        <button>Pesquisar</button>
        <button type="reset" onClick={() => getAllStudents()}>Limpar</button>
      </div>

      <div className="button-container">
        <button onClick={() => sortStudentAlphabetic()} type="button">{studentsIsSortedAlphabeticAToZ ? "Z-A" : "A-Z"}</button>
        <button onClick={() => sortStudentByInvoice()} type="button">Faturas paga maior e menor </button>
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
                <th>Número</th>
                <th>Prazo Dias</th>
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