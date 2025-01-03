export type Reader = {
    firstName: string,
    lastName: string,
    libraryCardNumber: number
}

export type Book = {
    title: string,
    author: string,
    year: number,
    borrower: Reader | null,
    isBorrowed: boolean
}