export interface StudentInterface {
    id: number
    name: string
    startDate: string
    phoneNumber: string
    invoicePayeds: string
    invoiceValue: string
    situation: string
    dueDate: string
    monthsPayeds: {
      january: boolean,
      february: boolean,
      march: boolean,
      april: boolean,
      may: boolean,
      june: boolean,
      july: boolean,
      august: boolean,
      september: boolean,
      october: boolean,
      november: boolean,
      december: boolean
    }
  }

export interface StudentQuerySearch {
  value: string
}

export interface ReactPaginateOnPageChangeEvent {
  selected: number
}