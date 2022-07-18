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
if(favFound === -1){
    favorites.push(animeFound);
} else {
        favorites.splice(favFound, 1);
    }
renderList();
renderFav();
listenerAnime();
localStorage.setItem('data', JSON.stringify(favorites));
};


function renderFav(){
    let newHtml = [];
    const wrongImageFav = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
    for (const eachFav of favorites){
        newHtml +=`<li class= 'fav-color js-favList' id='${eachFav.mal_id}'>`;
        newHtml += `<h2 class= 'title fav-color js-favTitle'>${eachFav.title} </h2>`;
        if(eachFav.images.jpg.image_url === wrongImageFav){
            newHtml += `<img src=${'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'} alt="imagen"/>`;
        } else {
            newHtml += `<img src='${eachFav.images.jpg.image_url}' alt='img' class='js-imageFav image'/>`;

        }
       
         } 
        
        
listenerAnime();
listFav.innerHTML = newHtml; 
}


function listenerAnime(){
    const liAnime = document.querySelectorAll('.js-eachList');
    for (const li of liAnime) {
        li.addEventListener('click', handleFav);
        
    }
};
    
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


function onLoad (){
    const dataLocalStorage = JSON.parse(localStorage.getItem('data'));
    console.log(dataLocalStorage);
    if (dataLocalStorage)  {
        favorites = dataLocalStorage;
        renderFav(); 
        

    }else {

    }

}
onLoad();


function clearResults(){
    results = '';
}
function handleReset(ev){
    let resetList = renderList;
    ev.preventDefault();
     clearResults();
     list.innerHTML='';
     resetList='';
    
       
}
reset.addEventListener('click' , handleReset);
//# sourceMappingURL=main.js.map
