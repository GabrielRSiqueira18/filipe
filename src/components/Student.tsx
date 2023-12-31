interface StudentProps {
  id: number
  name: string
  startDate: string
  phoneNumber: string
  invoiceValue: string
  invoicesPayeds: string
  situation: string
  dayToPay: string

}

export function Student({ id, name, startDate, phoneNumber, dayToPay ,invoiceValue, invoicesPayeds, situation }: StudentProps) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{startDate}</td>
      <td>{phoneNumber}</td>
      <td>{dayToPay}</td>
      <td>{invoiceValue}</td>
      <td>{invoicesPayeds}</td>
      <td className={`${situation === "Pago" ? "ok-2" : "late"}`}>
        {situation}
      </td>
    </tr>
)
}