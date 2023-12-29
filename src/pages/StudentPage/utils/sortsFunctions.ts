import { StudentInterface } from "../interfaces"

interface SortStudentAlphabetic {
  studentsIsSortedAlphabeticAToZ: boolean
  studentsList: StudentInterface[]
  setStudentsList: React.Dispatch<React.SetStateAction<StudentInterface[]>>
  setStudentsIsSortedAlphabeticAToZ: React.Dispatch<React.SetStateAction<boolean>>
}

interface SortStudentByInvoice {
  studentsIsSortedInvoiceBigger: boolean
  studentsList: StudentInterface[]
  setStudentsList: React.Dispatch<React.SetStateAction<StudentInterface[]>>
  setStudentsIsSortedInvoiceBigger: React.Dispatch<React.SetStateAction<boolean>>
}

//Sort by alphabetic
export function sortStudentAlphabetic({ studentsIsSortedAlphabeticAToZ, studentsList, setStudentsIsSortedAlphabeticAToZ, setStudentsList }: SortStudentAlphabetic) {
  if(studentsIsSortedAlphabeticAToZ == false) {
    setStudentsList(studentsList.sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())))
    setStudentsIsSortedAlphabeticAToZ(true)
  } else {
    setStudentsList(studentsList.sort((a, b) => b.name.toUpperCase().localeCompare(a.name.toUpperCase())))
    setStudentsIsSortedAlphabeticAToZ(false)
  }
}

//Sort by invoice
export function sortStudentByInvoice({ studentsList, studentsIsSortedInvoiceBigger, setStudentsIsSortedInvoiceBigger, setStudentsList }: SortStudentByInvoice) {
  if(studentsIsSortedInvoiceBigger == false) {
    setStudentsList(studentsList.sort((a, b) => Number(a.invoicePayeds) - Number(b.invoicePayeds)))
    setStudentsIsSortedInvoiceBigger(true)
  } else {
    setStudentsList(studentsList.sort((a, b) => Number(b.invoicePayeds) - Number(a.invoicePayeds)))
    setStudentsIsSortedInvoiceBigger(false)
  }
}