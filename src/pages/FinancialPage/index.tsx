import { useEffect, useState } from "react"
import "./style.css"
import { NavLink } from "react-router-dom"
import { Product } from "../../components/Product"
import { useForm } from "react-hook-form"
import { ProductsService } from "../../api/services/product"

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
  const { register, handleSubmit, reset } = useForm<Product>({})

  const [ registerStudentModalIsOpen, setRegisterStudentModalIsOpen ] = useState(false)

  const [ productList, setProductList ] = useState<Product[]>([])

  function cloneModalWithClickInLayer(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target instanceof HTMLDivElement && e.target.className === "modal-layer") {
      setRegisterStudentModalIsOpen(false)
    }
  }

  function handleRegisterNewProduct(data: Product) {
    const { date, description, month, pricePerUnit, quantity, type } = data

    const newProduct: Omit<Product, "id"> = {
      date,
      description,
      month,
      pricePerUnit,
      quantity,
      totalValue: pricePerUnit * quantity,
      type
    }

    ProductsService.create(newProduct)
      .then(result => {
        setProductList(state => [...state, result])
      })
      
    reset()

    setRegisterStudentModalIsOpen(false )
  }

  useEffect(() => {
    ProductsService.getAll()
      .then((products) => {
        setProductList(products)
      })
  }, [])

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
          <form onSubmit={handleSubmit(handleRegisterNewProduct)}>
            <div>
              <label 
                htmlFor="date">
                  Data:
              </label>
              <input 
                id='date' 
                type="date" 
                {...register("date")}
                required
              /> 
            </div>

            {/* <div>
              <label 
                htmlFor="startDate">Data do Início do Aluno:
              </label>
              <input 
                id='startDate' 
                type="date" 
              />
            </div> */}

            <div>
              <label 
                htmlFor="description">Descrição
              </label>
              <input 
                id='description' 
                type="text" 
                {...register("description")}
                required
              /> 
            </div>

            <div>
              <label 
                htmlFor="quantity">Quantidade:
              </label>
              <input 
                id='quantity' 
                step={1}
                type="number" 
                {...register("quantity")}
                required
              /> 
            </div>

            

            <div>
              <label 
                htmlFor="pricePerUnit">Valor Unitário
              </label>
              <input 
                id='pricePerUnit' 
                type="number" 
                {...register("pricePerUnit")}
                step="0.01"
                required
              />
            </div> 

            <div>
              <label 
                htmlFor="type">Tipo
              </label>
              <input 
                id='type' 
                type="text"
                {...register("type")} 
                required
              />
            </div> 
            <button className="register">
              Cadastrar
            </button>
          </form>
        </div>
      </div>

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
          <button onClick={() => setRegisterStudentModalIsOpen(true)}>Adicionar Produto</button>
          <NavLink to={"/"}>
            <button>Alunos</button>
          </NavLink>
        </header>
        <form>
          <div>
            <input type="text" placeholder="Pesquise por um produto" />
            <button>Pesquisar</button>
          </div>

          <div>
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
              {productList.map(product => {
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}


