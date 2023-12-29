interface StudentProps {
  id: number
  name: string
  startDate: string
  startTermToPay: string
  daysOfPayment: string
  invoiceDueDate: string
  invoiceValue: string
  invoicesPayeds: string
  situation: string
}

export function Student({ id, name, startDate, startTermToPay, daysOfPayment, invoiceValue, invoiceDueDate, invoicesPayeds, situation }: StudentProps) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{startDate}</td>
      <td>{startTermToPay}</td>
      <td>{daysOfPayment}</td>
      <td>{"20/10/2000"}</td>
      <td>{invoiceDueDate}</td>
      <td>{invoiceValue}</td>
      <td>{invoicesPayeds}</td>
      <td>
        <button>{situation}</button>
      </td>
    </tr>
)
}