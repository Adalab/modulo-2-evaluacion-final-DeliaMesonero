'use strict';

const btn = document.querySelector('.js-button');
const reset = document.querySelector('.js-btnReset');
const searchInput = document.querySelector('.js-search');
const list =document.querySelector('.js-list');
const listFav = document.querySelector('.js-listFav');
const btnFav = document.querySelector('.js-btnFav');
const resetIconFav = document.querySelector('.js-resetIconFav');


let results = [];
let favorites= [];
let newFav = [];

//función para borrar los resultados
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

//Función para borrar todos los favoritos

function handleResetFav(event){
    event.preventDefault();
    favorites = [];
    listFav.innerHTML = '';
        
    localStorage.removeItem("data");
    
    btnFav.classList.add('hidden');
        
    };
    


btnFav.addEventListener('click' , handleResetFav);


//Función principal favoritos

function handleFav(event){
const idSelected = parseInt(event.currentTarget.id);
const animeFound = results.data.find((result) => result.mal_id === idSelected);
const favFound = favorites.findIndex ((fav) => fav.mal_id === idSelected);
if(favFound === -1){
    favorites.push(animeFound);
   if(btnFav.classList.contains('hidden')){
       btnFav.classList.remove('hidden')
   } 

} else {
        favorites.splice(favFound, 1);
    }
renderList();
renderFav();
listenerAnime();
localStorage.setItem('data', JSON.stringify(favorites));
};

//Función parapintar los favoritos

function renderFav(){
    let newHtml = [];
    const wrongImageFav = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
    for (const eachFav of favorites){
        
        newHtml +=`<li class='favItem fav-colorList js-favList' id='${eachFav.mal_id}'>`;
        newHtml += `<h2 class= 'title-fav  js-favTitle'>${eachFav.title} </h2>`;
        if(eachFav.images.jpg.image_url === wrongImageFav){
            newHtml += `<img src=${'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'} class='imageFav' alt="imagen"/>`;
        } else {
            newHtml += `<img src='${eachFav.images.jpg.image_url}' alt='img' class='js-imageFav imageFav'/>`;

        }
        newHtml+=`<button id='${eachFav.mal_id}' class='resetIconFav js-resetIconFav'><i class='fa-solid fa-circle-xmark'></i></button>`;
         } 
        

listFav.innerHTML = newHtml; 
listenerResetFav()    
listenerAnime();

}


function listenerAnime(){
    const liAnime = document.querySelectorAll('.js-eachList');
    for (const li of liAnime) {
        li.addEventListener('click', handleFav);
        
    }
};

// Resultados API y pintarlos

btn.addEventListener('click', (event)=> {
    event.preventDefault();
    let searchInputValue = searchInput.value;

fetch(`https://api.jikan.moe/v4/anime?q=${searchInputValue}`)
.then((response) => response.json())
.then ((data) => {
    results = data;
    renderList(results);
   
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
      
       
        html +=`<li class= 'list  js-eachList ${classFav}' id='${eachResult.mal_id}'>`;
        if(eachResult.images.jpg.image_url === wrongImage){
            html += `<img src=${'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'} class='image' alt="imagen"/>`;
        } else {
            html += `<img src='${eachResult.images.jpg.image_url}' alt='img' class='js-image image'/>`;

        }
        html += `<h2 class= 'title js-title ${classFav}'>${eachResult.title} </h2>`;
        
    }
    

list.innerHTML = html;
listenerAnime();
};


// función para almacenar en el Local Storage 

function onLoad (){
    const dataLocalStorage = JSON.parse(localStorage.getItem('data'));
    if (dataLocalStorage)  {
        favorites = dataLocalStorage;
        renderFav();  
    }
}
onLoad();

//Función para resetear cada uno de los favoritos


function handleResetEachFav(event){
   
    event.preventDefault();
    const idResetSelect = parseInt(event.currentTarget.id);
   
    const resetFavFound = favorites.findIndex((fav) => fav.mal_id=== idResetSelect);
    btnFav.classList.add('hidden');
    if(resetFavFound !== -1){
        favorites.splice(resetFavFound, 1);
    if(btnFav.classList.contains('hidden')){
            btnFav.classList.remove('hidden')
    }
    }

    renderFav();
    listenerResetFav();
    localStorage.setItem('data', JSON.stringify(favorites));
};

function listenerResetFav(){
    const liFavIcon = document.querySelectorAll('.js-resetIconFav');
    for (const eachIconFav of liFavIcon) {
        eachIconFav.addEventListener('click' ,handleResetEachFav);
    }
   
};

