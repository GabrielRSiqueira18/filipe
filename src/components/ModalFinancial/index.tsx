import { useForm } from "react-hook-form"
import { ProductsService } from "../../api/services/product"

interface ModalFinancialProps {
  registerProductModalIsOpen: boolean
  setRegisterProductModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>
}

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

export function ModalFinancial({ registerProductModalIsOpen, setRegisterProductModalIsOpen, setProductList }: ModalFinancialProps) {
  const { register, handleSubmit, reset } = useForm<Product>({})


  function closeModalWithClickInLayer(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target instanceof HTMLDivElement && e.target.className === "modal-layer") {
      setRegisterProductModalIsOpen(false)
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
      
      //reset()

    // setRegisterStudentModalIsOpen(false)
  }

  return (
    <div 
        onClick={(e) => closeModalWithClickInLayer(e)}
        className={registerProductModalIsOpen ? `modal-layer` : "none"}
      >
        <div 
          className={registerProductModalIsOpen ? `modal` : "none"}
        >
          <header>
            <button>Cadastrar</button>
            <button onClick={() => setRegisterProductModalIsOpen(false)}>X</button>
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
  )
}