interface StudentProps {
  id: number
  name: string
  startDate: string
  startTermToPay: string
  daysOfPayment: string
  lasyDayToPay: string
  invoiceDueDate: string
  invoiceValue: string
}

export function Student({ id, name, startDate, startTermToPay, daysOfPayment, lasyDayToPay, invoiceValue, invoiceDueDate }: StudentProps) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{startDate}</td>
      <td>{startTermToPay}</td>
      <td>{daysOfPayment}</td>
      <td>{lasyDayToPay}</td>
      <td>{invoiceDueDate}</td>
      <td>{invoiceValue}</td>
      <td>0</td>
      <td>
        <button>Vencida</button>
      </td>
    </tr>
)
}