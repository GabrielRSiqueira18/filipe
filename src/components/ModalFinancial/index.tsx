import { Controller, useForm } from "react-hook-form"
import { ProductsService } from "../../api/services/product"
import * as RadioGroup from '@radix-ui/react-radio-group';
import "./styles.css"

interface ModalFinancialProps {
  registerProductModalIsOpen: boolean
  setRegisterProductModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>
}

interface Product {
  id: string
  date: string
  description: string
  pricePerUnit: number
  quantity: number
  totalValue: number
  type: "Entrada" | "Saída"

}

export function ModalFinancial({ registerProductModalIsOpen, setRegisterProductModalIsOpen, setProductList }: ModalFinancialProps) {
  const { register, handleSubmit, reset, control } = useForm<Product>({
    defaultValues: {
      type: "Entrada",
    }
  })


  function closeModalWithClickInLayer(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target instanceof HTMLDivElement && e.target.className === "modal-layer") {
      setRegisterProductModalIsOpen(false)
    }
  }

  function handleRegisterNewProduct(data: Product) {
    const { date, description, pricePerUnit, quantity, type } = data

    const newProduct: Omit<Product, "id"> = {
      date,
      description: description.toLowerCase(),
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
          className={registerProductModalIsOpen ? `modal-financial` : "none"}
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
              <Controller
                control={control}
                name="type"
                render={({ field }) => {
                  return (
                    <RadioGroup.Root className="radio-container" onValueChange={field.onChange} value={field.value}>
                      <RadioGroup.Item className="entry" value="Entrada">
                        Entrada
                      </RadioGroup.Item>
                      <RadioGroup.Item className="out" value="Saída">
                        Saída
                      </RadioGroup.Item>
                    </RadioGroup.Root>
                  )
                }}
              >


              </Controller>
            </div> 
            <button className="register">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
  )
}