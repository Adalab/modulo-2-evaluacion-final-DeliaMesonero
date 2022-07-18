'use strict';

const btn = document.querySelector('.js-button');
const reset = document.querySelector('.js-btnReset');
const searchInput = document.querySelector('.js-search');
const list =document.querySelector('.js-list');
const listFav = document.querySelector('.js-listFav');
//const searchInputValue = searchInput.value;
let results = [];
let favorites= [];
let newFav = [];


/*function pintNewFavorites(){
    let newHtml = [];
    if(newFav === favorites){
        newHtml +=`<li class= 'list js-eachList ${classFav}' id='${eachResult.mal_id}'>`;
        newHtml += `<h2 class= 'title js-title ${classFav}'>${eachResult.title} </h2>`;
        newHtml += `<img src='${eachResult.images.jpg.image_url}' alt='img' class='js-image image'/>`;
      ;
  } else { newFav ='';}
  
}; */


function handleFav(event){
  console.log(event.currentTarget.id);  
const idSelected = parseInt(event.currentTarget.id);
const animeFound = results.data.find((result) => result.mal_id === idSelected);
const favFound = favorites.findIndex ((fav) => fav.mal_id === idSelected);
let newHtml = [];
localStorage.setItem('data', JSON.stringify(favorites));
console.log(animeFound);
 /*for (const eachFav of favorites) {
    if(favFound === -1){
    favorites.push(animeFound);*/
    if(favFound === -1){
    favorites.push(animeFound);
    newHtml +=`<li class= 'favIem js-favList'>`;
    newHtml += `<h2 class= 'favtitle js-favTitle >${animeFound} </h2>`;
    newHtml += `<img src='' alt='img' class='js-favImage image'/>`;  
    
   } else {
    favorites.splice(favFound, 1);

}
renderList(favorites);
listenerAnime();
listFav.innerHTML = newHtml; 
console.log(favorites);


}


function listenerAnime(){
    const liAnime = document.querySelectorAll('.js-eachList');
    for (const li of liAnime) {
        li.addEventListener('click', handleFav);
        
    }
}
    
btn.addEventListener('click', (event)=> {
    event.preventDefault();
    let searchInputValue = searchInput.value;

fetch(`https://api.jikan.moe/v4/anime?q=${searchInputValue}`)
.then((response) => response.json())
.then ((data) => {
    results = data;
    renderList(results);
    console.log(data);
    
        });
    });


const renderList = (arrayresults) =>{
    let html ='';
    let classFav ='';
    for (const eachResult of results.data) {
        const wrongImage = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
        const favFoundIndex = favorites.findIndex((fav) => eachResult.mal_id === fav.mal_id);
        if(favFoundIndex !== -1){
            classFav = 'fav-color';
            

        } else {
            classFav = '';
        }

        html +=`<li class= 'list js-eachList ${classFav}' id='${eachResult.mal_id}'>`;
        if(eachResult.images.jpg.image_url === wrongImage){
            html += `<img src=${'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'} alt="imagen"/>`;
        } else {
            html += `<img src='${eachResult.images.jpg.image_url}' alt='img' class='js-image image'/>`;

        }
        html += `<h2 class= 'title js-title ${classFav}'>${eachResult.title} </h2>`;
        
    }
list.innerHTML = html;
listenerAnime();
};

/*
Al crear esta funcin de salen errores con result.data de la primera funcion

function onLoad (){
    const dataLocalStorage = JSON.parse(localStorage.getItem('data'));
    console.log(dataLocalStorage);
    if (dataLocalStorage)  {
        favorites = dataLocalStorage;
        renderList(favorites); 
        console.log('Hay algo');

    }else {

    }

}
onLoad();*/

function clearResults(){
    results = '';
}
function handleReset(event){
    event,preventDefault();
    if(results !== '') {
        clearResults();
    }
       
}
reset.addEventListener('click' , handleReset);