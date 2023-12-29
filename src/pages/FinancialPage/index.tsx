import { useEffect, useState } from "react"
import "./style.css"
import { NavLink } from "react-router-dom"
import { Product } from "../../components/Product"
import { useForm } from "react-hook-form"
import { ProductsService } from "../../api/services/product"
import ReactPaginate from "react-paginate"
import { ModalFinancial } from "../../components/ModalFinancial"

interface Product {
  id: string
  date: string
  description: string
  month: string
  pricePerUnit: number
  quantity: number
  totalValue: number
  type: "Entrada" | "Saída"

}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function FinancialPage() {
  const [ registerProductModalIsOpen, setRegisterProductModalIsOpen ] = useState(false)

  const [ productList, setProductList ] = useState<Product[]>([])

  const [ pageNumber, setPageNumber ] = useState(0)
  const productPerPage = 10
  const pageVisited = pageNumber * productPerPage

  const displayProducts = productList.slice(pageVisited, pageVisited + productPerPage).map(product => {
    return (
      <Product
        key={product.id}
        id= {product.id}
        date= {formatDate(product.date)}
        description={product.description}
        month={product.month}
        pricePerUnit={product.pricePerUnit}
        quantity={product.quantity}
        totalValue={product.totalValue}
        type={product.type}
      />
    )
  })


  

  

  useEffect(() => {
    ProductsService.getAll()
      .then((products) => {
        setProductList(products)
      })
  }, [])

  const pageCount = Math.ceil(productList.length / productPerPage)

  function changePage(event: any) {
    setPageNumber(event.selected)
  }


  return(
    <>
      <ModalFinancial
        registerProductModalIsOpen={registerProductModalIsOpen}
        setRegisterProductModalIsOpen={setRegisterProductModalIsOpen}
        setProductList={setProductList}
      />

      <header className='header'>
        <div className='container-header'>
        <div className='container-students-situation'>
            <h2>Produtos:</h2>
            <p className='ok'>Entrada: <span>0</span></p>
            <p className='overdue'>Saída: <span>0</span></p>
            <p>Total Valor: <span>1000</span></p>
          </div>
          <div className='container-total-values-students'>
            <h2>Total Valores Produtos</h2>
            <p>Janeiro</p>
            <p className='money'>R$ 1000.00</p>
          </div>
        </div>
      </header>

      <div className='students-container'>
        <header className='students-header'>
          <button onClick={() => setRegisterProductModalIsOpen(true)}>Adicionar Produto</button>
          <NavLink to={"/"}>
            <button>Alunos</button>
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
                <th>Data</th>
                <th>Mês</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Valor Total</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {displayProducts}
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


