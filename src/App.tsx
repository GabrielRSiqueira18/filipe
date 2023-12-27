import './App.css'

export function App() {

  return (
    <>
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
          <button>Adicionar Aluno</button>
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

