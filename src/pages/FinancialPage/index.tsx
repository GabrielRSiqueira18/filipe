import "./style.css"

import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Product } from "../../components/Product"
import { ProductsService } from "../../api/services/product"
import ReactPaginate from "react-paginate"
import { ModalFinancial } from "../../components/ModalFinancial"
import { ProductInterface, ProductQuerySearch } from "./interfaces"
import { useForm } from "react-hook-form"
import { formatter } from "../../utils/formatterValueToBRL"
import { format } from "date-fns"
import { ArrowLeft, ArrowRight } from "phosphor-react"

interface ReactPaginateOnPageChangeEvent {
  selected: number
}

export function FinancialPage() {
  const [ registerProductModalIsOpen, setRegisterProductModalIsOpen ] = useState(false)
  const [ productsList, setProductsList ] = useState<ProductInterface[]>([])

  //Pagination
  const [ pageNumber, setPageNumber ] = useState(0)
  const productPerPage = 8
  const pageVisited = pageNumber * productPerPage

  const displayProducts = productsList.slice(pageVisited, pageVisited + productPerPage).map(product => {
    const productDate = new Date(product.date)

    return (
      <Product
        key={product.id}
        id= {product.id}
        date= {format(productDate, "dd/MM/yyyy")}
        description={product.description.toUpperCase()}
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

  const [ countMonthActual, setCountMonthActual ] = useState(0)

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
   "december",
  ]

  const monthActualEnglish = months[countMonthActual]
  let monthActualPortuguese

  switch (monthActualEnglish) {
    case "january":
      monthActualPortuguese = "Janeiro";
      break;
    case "february":
      monthActualPortuguese = "Fevereiro";
      break;
    case "march":
      monthActualPortuguese = "Março";
      break;
    case "april":
      monthActualPortuguese = "Abril";
      break;
    case "may":
      monthActualPortuguese = "Maio";
      break;
    case "june":
      monthActualPortuguese = "Junho";
      break;
    case "july":
      monthActualPortuguese = "Julho";
      break;
    case "august":
      monthActualPortuguese = "Agosto";
      break;
    case "september":
      monthActualPortuguese = "Setembro";
      break;
    case "october":
      monthActualPortuguese = "Outubro";
      break;
    case "november":
      monthActualPortuguese = "Novembro";
      break;
    case "december":
      monthActualPortuguese = "Dezembro";
      break;
    default:
      console.error("Invalid month name:", monthActualEnglish);
  }

  //Get Products in DB
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

  //Adjust Value
  const totalValue = productsList.reduce((finalValue, innitialValue) => {
    let value

    if(innitialValue.type === "Entrada") {
      value = (Number(innitialValue.totalValue))
    } else {
      value = -(Number(innitialValue.totalValue))
    }

    return finalValue += value
  }, 0)

  //Types Count
  const entry = productsList.filter(product => product.type === "Entrada").length
  const out = productsList.filter(product => product.type === "Saída").length
  
  function decreaseMonth() {
    setCountMonthActual(state => {
      if(state == 0) {
        return state = 0
      } else  {
        return state -= 1
      }
    })
  }
  
  function addMonths() {
    setCountMonthActual(state => {
      if(state >= 11) {
        return state = 11
      } else  {
        return state += 1
      }
    })
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
            <p className='ok'>Entrada: <span>{entry}</span></p>
            <p className='overdue'>Saída: <span>{out}</span></p>
            {/* <p>Total Valor: <span>{formatter.format(totalValue)}</span></p> */}
          </div>
          <div className='container-total-values-students'>
            <h2>Total Valores Produtos</h2>
            <p style={totalValue < 0 ? { color: 'red' } : { color: 'green' }} className='money'>
              {formatter.format(totalValue)}
            </p>
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

    <div className="container-arrows-months">
        <button onClick={() => decreaseMonth()}> <ArrowLeft size={14} /> </button>
        {monthActualPortuguese} 
        <button onClick={() => addMonths()}> <ArrowRight size={14} /> </button>
      </div>
      RS 1000,00


        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
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


