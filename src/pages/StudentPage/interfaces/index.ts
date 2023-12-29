export interface StudentInterface {
    id: number
    name: string
    startDate: string
    startTermToPay: string
    daysOfPayment: string
    invoicePayeds: string
    invoiceDueDate: string
    invoiceValue: string
    situation: string
  }

export interface StudentQuerySearch {
  value: string
}

export interface ReactPaginateOnPageChangeEvent {
  selected: number
}