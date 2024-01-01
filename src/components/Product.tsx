interface ProductProps {
    id: string
    date: string
    description: string
    pricePerUnit: number
    quantity: number
    totalValue: number
    type: "Entrada" | "Saída"
  }
  
  export function Product({ id, date, description, quantity, pricePerUnit, totalValue, type }: ProductProps) {
    return (
      <tr>
        <td>{id}</td>
        <td>{date}</td>
        <td>{description}</td>
        <td>{quantity}</td>
        <td>{pricePerUnit}</td>
        <td>{totalValue}</td>
        <td className={`${type === "Entrada" ? "ok-2" : "late"}`}>{type}</td>
      </tr>
  )
  }