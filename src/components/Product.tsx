interface StudentProps {
    id: string
    date: string
    description: string
    month: string
    pricePerUnit: number
    quantity: number
    totalValue: number
    type: "Entrada" | "Saída"
  }
  
  export function Product({ id, date, description, quantity, pricePerUnit, totalValue, type, month }: StudentProps) {
    return (
      <tr>
        <td>{id}</td>
        <td>{date}</td>
        <td>{month}</td>
        <td>{description}</td>
        <td>{quantity}</td>
        <td>{pricePerUnit}</td>
        <td>{totalValue}</td>
        <td>{type}</td>
      </tr>
  )
  }