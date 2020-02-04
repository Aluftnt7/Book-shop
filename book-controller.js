'use strict'

function onInit() {
    renderBooks()
    loadFromStorage('users')

}

function renderBooks() {
    var books = getBooksForDisplay()
    var strHTMLs = books.map(function(book) {
        return `
        
        <div class="card rounded mx-auto " style="width: 15rem; height : 700px; opacity: 0.85; 
        ">
        <img src="${book.img}" class="book-img card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${book.name}</h5>
            <p class="card-text">${book.details}.</p>
        </div>
        <div class="page-bottom">
        <ul class="list-group list-group-flush">
            <li> 
            <h5> <span> ${book.price} ₪ </span> </h5>
            <h5> <span data-trans = "book-rate"> Book Rate </span> - ${book.rate} </h5>
              <div class="btn-container">
                 <button class = "btn read btn btn-dark btn-sm" onclick="onReadingDetails(${book.id})" data-trans = "read"> Read </button>
                 <button class = "btn update btn btn-dark btn-sm" onclick="onUpdateBook(${book.id})" data-trans = "update"> Update price </button>
                 <button class = "btn remove btn btn-dark btn-sm" onclick="onRemoveBook(${book.id})" data-trans = "remove"> Remove </button>
                     </div>
            </li>
        </ul>
       
        </div>
    </div>

            `
    })
    var elBookList = document.querySelector('.card-container');
    elBookList.innerHTML = strHTMLs.join('');
    doTrans()
}




function onRemoveBook(bookId) {
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removeBook(bookId);
        renderBooks();
    }
}

function onAddBook() {
    //TODO make this work in one click
    var elInput = document.querySelector('.add-input');
    (elInput.style.display === 'none') ? elInput.style.display = 'block': elInput.style.display = 'none'
    document.querySelector('#input-name').value = ''
    document.querySelector('#input-price').value = ''
    document.querySelector('#input-dets').value = ''
    document.querySelector('#input-img').value = ''

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
            <h5 data-trans = "rate"> Rate Book </h5>        
        <div class = "plus-minus">
            <button class = "minus-rate" onclick="onUpdateRate(this , ${book.id})">  -  </button> <span class = "inner-rate">${book.rate}</span> <button class="plus-rate" onclick="onUpdateRate(this ,${book.id})">  +  </button>
        </div>`

    } else {

        var strHTML = `<p>
        ${book.name} is a great book, and its for every one. ${book.details}
        </p>
        <img src="${book.img}"/> 
        <h5 data-trans = "rate"> Rate Book </h5>
        <div class = "plus-minus"><button class = "minus-rate" onclick="onUpdateRate(this , ${book.id})">  -  </button> <span class = "inner-rate"> ${book.rate} </span> <button class = "plus-rate" onclick="onUpdateRate(this , ${book.id})">  +  </button></div>`
    }
    elDetails.innerHTML = strHTML
    renderBooks()
    doTrans()
}


function onSubmit() {
    var elInput = document.querySelector('.add-input')
    elInput.style.display = 'none'
    var bookName = document.querySelector('#input-name').value
    var bookPrice = document.querySelector('#input-price').value
    var bookDets = document.querySelector('#input-dets').value
    var bookImg = document.querySelector('#input-img').value
    addBook(bookName, bookPrice, bookDets, bookImg)
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

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }

    doTrans();
}


function onJumpPage(diff) {
    var lastPage = Math.ceil(gBooks.length / booksInPage);

    if (diff === 0) gCurrPage = 1
    if (diff === 1) gCurrPage = 2
    if (diff === 2) gCurrPage = 3
    if (gCurrPage > lastPage) gCurrPage = 1;
    else if (gCurrPage < 1) gCurrPage = lastPage;
    renderBooks();

}