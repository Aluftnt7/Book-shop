'use strict'

var gBooks = createBooks()
var booksInPage = 4;
var gCurrPage = 1;

// console.log(gBooks);


function createBooks() {
    var books = loadFromStorage('books')
    if (books) return books
    var books = [
        { name: 'Book of mormons', price: 80, img: 'img/bookOfMormon.png ', details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, eligendi repellendus aliquam enim quaerat vitae aliquid natus molestiae ab id neque est incidunt voluptate quo numquam illum. Commodi, error amet.' },
        { name: 'Harry Potter', price: 70, img: 'img/harryPoter.png', details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, eligendi repellendus aliquam enim quaerat vitae aliquid natus molestiae ab id neque est incidunt voluptate quo numquam illum. Commodi, error amet.' },
        { name: 'The golden toilet', price: 60, img: 'img/goldenToilet.png', details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, eligendi repellendus aliquam enim quaerat vitae aliquid natus molestiae ab id neque est incidunt voluptate quo numquam illum. Commodi, error amet.' }
    ].map(createBook)
    return books
}


function createBook(bookObject) {
    return {
        id: parseInt(Math.random() * 1000),
        name: bookObject.name,
        price: bookObject.price,
        img: bookObject.img,
        details: bookObject.details,
        rate: 0
    }
}


function removeBook(bookId) {
    var idx = gBooks.findIndex(function(book) {
        return book.id === bookId
    })
    gBooks.splice(idx, 1);
    saveToStorage('books', gBooks);
}

function addBook(name, price, dets, img) {
    if (!name || !price) return null
    if (!img) img = 'img/noPicAvailable.png'
    var newBook = createBook({ name: name, price: price, details: dets, img: img })
    gBooks.push(newBook)
    saveToStorage('books', gBooks);
    return gBooks
}

function updateBook(id, price) {
    var book = gBooks.find(function(book) {
        return book.id === id
    })
    book.price = price
    saveToStorage('books', gBooks);

}



function closeModal() {
    document.querySelector('.details-container').hidden = true
}

function findBookById(id) {
    return gBooks.find(function(book) {
        return book.id === id
    })
}

function checkRate(elBtn, bookId) {
    var book = findBookById(bookId)
    if (elBtn.classList.contains('plus-rate') && book.rate < 10) {
        book.rate++
    } else if (elBtn.classList.contains('minus-rate') && book.rate > 0) {
        book.rate--
    }
    saveToStorage('books', gBooks)
    return gBooks
}


function getBooksForDisplay() {
    var from = (gCurrPage - 1) * booksInPage;
    var to = from + booksInPage;
    return gBooks.slice(from, to);
}


function changePage(diff) {

    gCurrPage += diff;
    var lastPage = Math.ceil(gBooks.length / booksInPage);

    if (gCurrPage > lastPage) gCurrPage = 1;
    else if (gCurrPage < 1) gCurrPage = lastPage;

}