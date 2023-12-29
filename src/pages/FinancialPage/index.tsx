import "./style.css"

import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Product } from "../../components/Product"
import { ProductsService } from "../../api/services/product"
import ReactPaginate from "react-paginate"
import { ModalFinancial } from "../../components/ModalFinancial"
import { formatDate } from "../../utils/formatDate"
import { ProductInterface, ProductQuerySearch } from "./interfaces"
import { useForm } from "react-hook-form"

interface ReactPaginateOnPageChangeEvent {
  selected: number
}

export function FinancialPage() {
  const [ registerProductModalIsOpen, setRegisterProductModalIsOpen ] = useState(false)
  const [ productsList, setProductsList ] = useState<ProductInterface[]>([])

  //Pagination
  const [ pageNumber, setPageNumber ] = useState(0)
  const productPerPage = 10
  const pageVisited = pageNumber * productPerPage

  const displayProducts = productsList.slice(pageVisited, pageVisited + productPerPage).map(product => {
    return (
      <Product
        key={product.id}
        id= {product.id}
        date= {formatDate(product.date)}
        description={product.description.toUpperCase()}
        month={product.month}
        pricePerUnit={product.pricePerUnit}
        quantity={product.quantity}
        totalValue={product.totalValue}
        type={product.type}
      />
    )
  })

  const pageCount = Math.ceil(productsList.length / productPerPage)

  function changePage(event: ReactPaginateOnPageChangeEvent) {
    setPageNumber(event.selected)
  }

  //Acess Products in DB
  async function getAllProducts() {
    ProductsService.getAll()
      .then((products) => {
        setProductsList(products)
      })
  }

  useEffect(() => {
    ProductsService.getAll()
      .then((products) => {
        setProductsList(products)
      })
  }, [])

  
  //Form Filter
  const { register, handleSubmit, reset } = useForm<ProductQuerySearch>({})

  async function handleSubmitSearchByDescription({ value }: ProductQuerySearch) {
    ProductsService.getByDescription(value.toLowerCase())
      .then(product => setProductsList(product))
  }

  const [ productsIsSortedAlphabeticAToZ, setProductsIsSortedAlphabeticAToZ ] = useState(false)
  const [ productsIsSortedInvoiceBigger, setProductsIsSortedInvoiceBigger ] = useState(false)

  function sortProductsAlphabetic() {
    if(productsIsSortedAlphabeticAToZ == false) {
      setProductsList(productsList.sort((a, b) => a.description.toUpperCase().localeCompare(b.description.toUpperCase())))
      setProductsIsSortedAlphabeticAToZ(true)
    } else {
      setProductsList(productsList.sort((a, b) => b.description.toUpperCase().localeCompare(a.description.toUpperCase())))
      setProductsIsSortedAlphabeticAToZ(false)
    }
  }
  
  function sortProductsByTotalValue() {
    if(productsIsSortedInvoiceBigger == false) {
      setProductsList(productsList.sort((a, b) => Number(a.totalValue) - Number(b.totalValue)))
      setProductsIsSortedInvoiceBigger(true)
    } else {
      setProductsList(productsList.sort((a, b) => Number(b.totalValue) - Number(a.totalValue)))
      setProductsIsSortedInvoiceBigger(false)
    }
  }

  return(
    <>
      <ModalFinancial
        registerProductModalIsOpen={registerProductModalIsOpen}
        setRegisterProductModalIsOpen={setRegisterProductModalIsOpen}
        setProductList={setProductsList}
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
        
        <form onSubmit={handleSubmit(handleSubmitSearchByDescription)} className="form-filter">
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Pesquise por um produto" 
          {...register("value")}
        />
        <button>Pesquisar</button>
        <button type="reset" onClick={() => getAllProducts()}>Limpar</button>
      </div>

      <div className="button-container">
        <button onClick={() => sortProductsAlphabetic()} type="button">{ productsIsSortedAlphabeticAToZ ? "Z-A" : "A-Z" }</button>
        <button onClick={() => sortProductsByTotalValue()} type="button">Maior total </button>
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


