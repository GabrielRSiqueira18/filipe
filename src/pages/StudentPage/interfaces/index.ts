export interface StudentInterface {
    id: number
    name: string
    startDate: string
    phoneNumber: string
    invoicePayeds: string
    invoiceValue: string
    situation: string
    dayToPay: string
  }

export interface StudentQuerySearch {
  value: string
}

export interface ReactPaginateOnPageChangeEvent {
  selected: number
}