import { Routes, Route } from "react-router-dom"
import { StudentPage } from "./pages/StudentPage"
import { FinancialPage } from "./pages/FinancialPage"

export function Router() {
  return(
    <Routes>
      <Route path="/" element={<StudentPage/>} />
      <Route path="/produtos" element={<FinancialPage/>} />
  </Routes>
  )
}