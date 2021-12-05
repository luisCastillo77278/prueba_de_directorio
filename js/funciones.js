import {
  deleteDirectorio
} from './http-providers.js';

export const createLinks = (card, links) => {
  links.forEach((link) => {
    const cardLink = card.querySelector(".card__content__links");
    const div = document.createElement("div");
    const tooltip = document.createElement("tooltip");
    div.classList.add(
      "card__content__links__btn__groups"
    );

    const htmlLink = `
            <div class="card__content__links__btn__groups__link">
                <a href="${link.link}">
                    <i class="fas fa-link"></i>${link.name.charAt(0).toUpperCase()+ link.name.slice(1)}
                </a>
            </div>
        `;

    if (link.requerimients) {
      const htmlTooltip = `
                <div class="card__tooltip--btn">
                    <i class="fas fa-exclamation-circle"></i>
                    <div class="tooltip">
                        <div class="card__tooltip--content">
                            <div class="card__tooltip__content--text">
                                ${link.requerimients}
                            </div>
                            <div class="tooltip__cuadrado">
                            </div>
                        </div>
                    </div>
                </div>
            `;
      tooltip.classList.add("card__tooltip");
      tooltip.innerHTML = htmlTooltip;
    }

    div.innerHTML = htmlLink;
    cardLink.append(div);
    div.append(tooltip);
  });
};

export const createCards = (docLinks) => {
  const main = document.querySelector("#main");
  const card = document.createElement("div");
  card.classList.add("card");
  const htmlCard = `
    <div class="card__head">
        <!-- icon -->
        <button class="btn btn-dorado btnDelete" id="${docLinks.id}">
            <i class="fas fa-trash"></i>
        </button>
        <a class="btn btn-dorado" href="edit.html?id=${docLinks.id}">
            <i class="fas fa-pen"></i>
        </a>
    </div>
    <img src="${location.origin}/${location.pathname.split('/')[1]}/Api/public/img/${docLinks.icon}" alt="icono">
    <div class="card__content">
      <div class="card__content__title">${ docLinks.name.charAt(0).toUpperCase()+docLinks.name.slice(1)} </div>
      <div class="card__content__desc">${docLinks.desc.charAt(0).toUpperCase()+docLinks.name.slice(1)}</div>
      <div class="card__content__links">
      </div>
    </div>
  `;

  card.innerHTML = htmlCard;
  main.append(card);
  createLinks(card, docLinks.links);
};

export const createAlert = (text = '') => {
  const container = document.querySelector('.container');
  const div = document.createElement("div");
  div.classList.add('content');
  div.innerHTML = "";
  const html = `
    <div class="alert__danger">
      ${text }
      <i class="fas fa-exclamation-triangle"></i>
    </div>
  `;
  div.innerHTML = html;
  container.append(div);
};

export const cargarSpinner = () =>{
  const main = document.querySelector('#main');
  const div = document.createElement('div');
  div.classList.add('content__spinner');
  const html = `
    <div class="spinner">         
    </div>
    <div class="spinnet--text">cargando...</div>
  `;

  div.innerHTML = html;
  main.append(div);
}


export const removeSpinner = () =>{
  const main = document.querySelector('#main');
  const spinner = main.querySelector('.content__spinner');
  main.removeChild(spinner); 
}

export const renderCards = (array = []) => {
  array.forEach(createCards);
  document.querySelectorAll('.btnDelete').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const main = document.querySelector('#main');
      Swal.fire({
        title: 'Alerta!',
        text: '¿Desea eliminar el directorio?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'continuar'
      }).then( resp =>{
        if(resp.isConfirmed){
          deleteDirectorio(btn.id);
          main.removeChild(btn.parentNode.parentNode);
          Swal.fire('Eliminacion exitosa!', '', 'success')
          .then( () => {
            if(main.children.length === 0){
              createAlert('No se encontro ningún elemento');
            }
          })
        }
      });
    })
  });
};
