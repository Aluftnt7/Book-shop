'use strict'

var gTrans = {
    title: {
        en: 'Welcome to your Book-shop',
        jap: 'ブックショップへようこそ',
        he: 'ברוכים הבאים לחנות הספרים שלך!'
    },

    'add-btn': {
        en: 'Add book!',
        jap: '追加',
        he: 'הוסף',
    },
    read: {
        en: 'Read more',
        jap: '続きを読む',
        he: 'קרא עוד',
    },
    update: {
        en: 'Update price',
        jap: '更新',
        he: 'עדכן'
    },
    remove: {
        en: 'Remove',
        jap: '削除する',
        he: 'הסר'
    },
    'book-rate': {
        en: 'Book-rate',
        jap: 'ブックレート',
        he: 'דירוג הספר',
    },
    rate: {
        en: 'Rate-book',
        jap: '料金表',
        he: 'דרג',
    },
    'input-price': {
        en: 'What will be the price?',
        jap: '価格はいくらですか？',
        he: '?מה יהיה מחיר הספר',
    },
    'input-name': {
        en: 'What is the name of the book?',
        jap: '名前は何ですか？',
        he: '?מה יהיה שם הספר',
    },
    'input-img': {
        en: 'Want to add img url to that book?',
        jap: 'その本にカバー写真を追加したいですか？',
        he: '?רוצה להוסיף תמונת כריכה',
    },
    'input-dets': {
        en: 'add some details?',
        jap: '詳細を追加しますか？',
        he: 'תמיד כדאי להוסיף קצת פרטים ;)',
    },

}

var gCurrLang = 'en';

function doTrans() {
    // For each el get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        var txt = getTrans(el.dataset.trans);
        // If this is an input, translate the placeholder
        if (el.placeholder) el.placeholder = txt;
        else el.innerText = txt;
    })
}


function getTrans(transKey) {
    var langMap = gTrans[transKey]
    if (!langMap) return 'UNKNOWN';
    var txt = langMap[gCurrLang]
        // If translation not found - use english
    if (!txt) txt = langMap['en'];
    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}