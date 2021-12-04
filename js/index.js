"use strict";
console.log("conectado");

import { 
  renderCards, 
  createAlert, 
  cargarSpinner, 
  removeSpinner,
} from "./funciones.js";

import { getDirectorios } from "./http-providers.js";

const form = document.querySelector("form");
const input = document.querySelector(".header__content__form input");
const btnMenu = document.querySelector("#btnMenu");
const nav = document.querySelector(".nav");

const btnAcercaDe = document.querySelector("#btnAcercaDe");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const btnCloseModal = document.querySelector("#btnCloseModal");

if( !location.pathname.includes('create.html') && !location.pathname.includes('edit.html')){
  cargarSpinner();
  const params = new URLSearchParams(location.search);

  getDirectorios()
  .then( resp => {
    if( params.has('buscar')){
      const query = params.get('buscar').toLocaleLowerCase();
      const directorios = resp.filter( data => {
        if( data.name
          .toLocaleLowerCase()
          .indexOf( query ) !== -1
          ||
          data.desc
          .toLocaleLowerCase()
          .indexOf( query ) !== -1
        ){
          return data;
        }
      })
      if (directorios.length > 0){
        renderCards(directorios);
        removeSpinner();
      }else{
        createAlert('No se encontro ningún elemento');
        removeSpinner();
      }
    }else{
      if(resp.length > 0){
        renderCards( resp );
      }else{
        createAlert('No se encontro ningún elemento');
      }
      removeSpinner();
    }
  })
  .catch( console.log );
}

//* EVENTOS
form.addEventListener("submit", (e) => e.preventDefault());

input.addEventListener("keypress", async (e) => {
  if (e.keyCode === 13) {
    form.submit();
  }
});

btnAcercaDe.addEventListener("click", () => {
  modal.classList.add("modal__show");
  modal.classList.remove("modal__hidden");

  modalContent.classList.add("modal__show");
  modalContent.classList.remove("modal__hidden");

  document.body.classList.add("disabeScroll");
});

btnCloseModal.addEventListener("click", () => {
  modalContent.classList.add("modal__hidden");
  modalContent.classList.remove("modal__show");

  setTimeout(() => {
    modal.classList.add("modal__hidden");
    modal.classList.remove("modal__show");
  }, 500);

  document.body.classList.remove("disabeScroll");
});

btnMenu.addEventListener('click', ()=>{
  nav.classList.toggle('show');
})
