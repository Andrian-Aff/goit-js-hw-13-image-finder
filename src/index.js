import NewsApiService from './js/apiService';
import hitsTpl from './templates/galleryMarkup.hbs'
import './sass/main.scss';
import openModal from './js/modal';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import {error} from '@pnotify/core';

const debounce = require('lodash.debounce');


export const refs = {
   inputEl: document.querySelector('.search-form'),
   galleryMurkup: document.querySelector('.gallery'),
   body: document.querySelector('body'),
   btnLoadMore: document.querySelector('.button-load-more')
};


refs.btnLoadMore.addEventListener('click', addPictures);
refs.galleryMurkup.addEventListener('click', openModal);
refs.inputEl.addEventListener('input', debounce(takeInputValue, 1500));

const newsApiService = new NewsApiService(1, 'children');



// function onSearch(e) {
//     e.preventDefault();
//     newsApiService.query = e.currentTarget.elements.query.value;
//     newsApiService.resetPage();
//     newsApiService.fetchArticles().then(appendHitsMarkup);
 
// }

// function appendHitsMarkup(hits) {
//     refs.galleryMurkup.insertAdjacentHTML('beforeend', hitsTpl(hits));
// }


function takeInputValue(event){
    let value = event.currentTarget.elements.query.value.toLowerCase().trim();
    console.log(value);

    if(value === ''){
        // hideButton()
        clearContainer();       
        return InputError();
    }

    if (value !== newsApiService.inputValue){
        clearContainer();
        newsApiService.returnStartPage();
        newsApiService.setInputValue(value);
    }

        return showPictures(newsApiService.inputValue)
}


function showPictures () {
    newsApiService.getPictures()
    .then(hits => 
    {renderGallery(hits)})    
    .then(newsApiService.incrementPage())
}
    
function renderGallery(arr) {
    console.log(arr)
    if (arr.hits.length === 0) {
        return notifError();
    }
    // console.log(arr)
    const markup = hitsTpl(arr);
    //console.log(markup);   
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    //registerObserver();
}


function addPictures(event){
    event.preventDefault();
    newsApiService.getPictures()
    .then(hits => 
        {renderGallery(hits)})
    .then(newsApiService.incrementPage())    
}

function clearContainer(){
    refs.gallery.innerHTML = '';
}


// кнопка дозагрузки
function showButton(){
    refs.btnLoadMore.classList.add('visible');
}

function hideButton(){
    refs.btnLoadMore.classList.remove('visible');
}


function notifError() {
    error({
        title: 'Unfortunately, your search returned no results.',
        text: 'Try again :)',
        delay: 1500
      });
};

function InputError() {
    error({
        title: 'Incorrected input',
        text: 'Please, try again :)',
        delay: 1500
      });
};

function registerObserver(){

const callback = entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting && newsApiService.inputValue !== ''){
            newsApiService.getPictures()
            .then(hits => 
                {renderGallery(hits)})
                .then(newsApiService.incrementPage())
        }

    })}

const options = {
    rootMargin: '300px',
};

const observer = new IntersectionObserver(callback, options);
observer.observe(refs.btnLoadMore);
}