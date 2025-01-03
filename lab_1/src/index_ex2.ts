import {Reader} from "./types_ex2";
import {Book} from "./types_ex2";

const catalog: Book[] = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        borrower: null,
        isBorrowed: false
    },
    {
        title: "Moby-Dick",
        author: "Herman Melville",
        year: 1851,
        borrower: null,
        isBorrowed: false
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        borrower: {
            firstName: "Jane",
            lastName: "Smith",
            libraryCardNumber: 102
        },
        isBorrowed: true
    }
]
const readers: Reader[] = [
    {
        firstName: "John",
        lastName: "Doe",
        libraryCardNumber: 101
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        libraryCardNumber: 102
    },
    {
        firstName: "Emily",
        lastName: "Johnson",
        libraryCardNumber: 103
    },
    {
        firstName: "Michael",
        lastName: "Brown",
        libraryCardNumber: 104
    },
    {
        firstName: "Sarah",
        lastName: "Davis",
        libraryCardNumber: 105
    }
]

const findBook = (catalog: Book[], name: string) => {
    return catalog.find(b => b.title.includes(name));
}

const getAvailableBooks = (catalog: Book[]) => {
    return catalog.filter(b => !b.isBorrowed);
}

function borrowBook(catalog: Book[], reader: Reader, name: string) {
    const book = findBook(catalog, name);
    if (book && !book.isBorrowed) {
        book.isBorrowed = true;
        book.borrower = reader;
    } else {
        console.log("Book is already borrowed");
    }
}

const book1 = findBook(catalog, "Pride");
console.log(book1);
const freeBooks = getAvailableBooks(catalog);
console.log(freeBooks);
borrowBook(catalog, readers[0], "The Great Gatsby")
console.log(catalog);