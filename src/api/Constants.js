export const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';


export const endpoints = {
    book: {
        listSearch: `${BASE_URL}?q=`,
        show: `${BASE_URL}/`,
    }
}