'use strict'

function onInit() {
    renderBooks()
    loadFromStorage('users')
}

function renderBooks() {
    var books = getBooksForDisplay()
    var strHTMLs = books.map(function (book) {
        return `
        <li class="book-item">
            <h3>${book.name}</h3>
            <img src="${book.img}"/>
            <h3>${book.price}$</h3>
            <h4> Book Rate - ${book.rate} </h4>
            <div class="btn-container">
            <button class = "btn read" onclick="onReadingDetails(${book.id})"> Read </button>
            <button class = "btn update" onclick="onUpdateBook(${book.id})"> Update </button>
            <button class = "btn remove" onclick="onRemoveBook(${book.id})"> Remove </button>
            </div>
            </li>
            `
    })
    var elBookList = document.querySelector('.book-list');
    elBookList.innerHTML = strHTMLs.join('');
}


function onRemoveBook(bookId) {
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removeBook(bookId);
        renderBooks();
    }
}

function onAddBook() {
    var bookName = prompt('Which book would you like to add?')
    var bookPrice = +prompt('what will be the price of that book?')
    var bookImg = prompt('wanna add url to that book cover?')
    addBook(bookName, bookPrice,bookImg)
    renderBooks()
}


function onUpdateBook(bookId) {
    var newPrice = +prompt('what is the your new price?')
    if (!newPrice) return
    updateBook(bookId, newPrice)
    renderBooks()
}



function onReadingDetails(bookId) {
    var elDetContainer = document.querySelector('.details-container')
    var elDetails = document.querySelector('.book-details')
    elDetContainer.hidden = false
    var book = findBookById(bookId)

    if (!book.details) {
        var strHTML =
            `<p> There is no data available at the moment 😲 </p>
            <img src="${book.img}"/>   
            <h5> Rate Book </h5>        
        <div class = "plus-minus">
            <button class = "minus-rate" onclick="onUpdateRate(this , ${book.id})">  -  </button> <span class = "inner-rate">${book.rate}</span> <button class="plus-rate" onclick="onUpdateRate(this ,${book.id})">  +  </button>
        </div>`

    } else {

        var strHTML = `<p>
        ${book.name} is a great book, and its for every one. ${book.details}
        </p>
        <img src="${book.img}"/> 
        <h5> Rate Book </h5>
        <div class = "plus-minus"><button class = "minus-rate" onclick="onUpdateRate(this , ${book.id})">  -  </button> <span class = "inner-rate"> ${book.rate} </span> <button class = "plus-rate" onclick="onUpdateRate(this , ${book.id})">  +  </button></div>`
    }
    elDetails.innerHTML = strHTML
    renderBooks()
}


function onUpdateRate(elBtn, bookId) {
    checkRate(elBtn, bookId)
    var book = findBookById(bookId)
    var elSpan = document.querySelector('.inner-rate')
    elSpan.innerHTML = book.rate
    renderBooks()
}

function onChangePage(diff) {
    changePage(diff)
    renderBooks();
}