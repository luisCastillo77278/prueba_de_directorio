import {
    getDirectorio,
    putDirectorio,
    postLinks,
    getLinksId,
    postIconDirectorio,
    deleteLinkId
} from './http-providers.js';

const params = new URLSearchParams(location.search);

const formDirectorio = document.querySelector('#formEdit');
const name = document.querySelector('#nameDirectorio');
const desc = document.querySelector('#description');
const file = document.querySelector('#file');
const btnFile = document.querySelector('#btnFile');

const formLinks = document.querySelector('.form__links');
const btnAdd = document.querySelector('#btnAdd');
const btnMin = document.querySelector('#btnMin');
const btnEnviar = document.querySelector('#btnEnviar');

const err_nameDirectorio = document.querySelector('#error_nameDirectorio');
const err_description = document.querySelector('#error_decription');
const err_file = document.querySelector('#error_file');

const errors = {};

const isNotEmpty = input => {
    if(validator.isEmpty(input.value, { ignore_whitespace: true})){
        errors[input.id] = 'el campo es requerido';
        return false;
    }
    delete errors[input.id];
    return true;
}

const isNotUrl = input =>{
    if(!validator.isURL(input.value)){
        errors[input.id] = 'el campo no es un url valido';
        return false;
    }
    delete errors[input.id];
    return true;
}


const isValidFile = input =>{
    if(input.files[0] && !validator.isIn(input.files[0].type, ['image/jpg', 'image/png', 'image/jpeg'])){
        errors[input.name] = 'El archivo que intenta subir no es un formato valido';
        return false;
      }
      delete errors[input.name];
      return true;
}

const validationDesc = () =>{
    if(!isNotEmpty(desc)) return;
}

const validationName = () =>{
    if(!isNotEmpty(name)) return;
}

const validationFile = () =>{
    if(!isValidFile(file)) return;
}


const validationForm = () =>{
    const link_input = document.querySelectorAll('.link-input');
    const input_urls = document.querySelectorAll('.link-url');
    
    validationDesc();
    validationName();
    validationFile();

    for(let i = 0; i < link_input.length; i++){
        if(!isNotEmpty(link_input[i]));
    }
    for(let i = 0; i < input_urls.length; i++){
        if(!isNotEmpty(input_urls[i])) return;
        if(!isNotUrl(input_urls[i]));
    }
}

const printMsgErrors  = () =>{
    const inputs_array = document.querySelectorAll('.link-input');
    const inputs_urls = document.querySelectorAll('.link-url');
    
    err_nameDirectorio.innerHTML = '';
    err_description.innerHTML = '';
    err_file.innerHTML = '';

    for(let i = 0; i < inputs_array.length; i++){
        inputs_array[i].nextElementSibling.innerHTML = '';  
    }

    for(let i = 0; i < inputs_urls.length; i++){
        inputs_urls[i].nextElementSibling.innerHTML = '';
    }

    Object.keys(errors).forEach( (key, index) => {
        switch(key){
            case 'nameDirectorio':
                err_nameDirectorio.innerHTML = errors[key];
                break;
            case 'description':
                err_description.innerHTML = errors[key];
                break;
            case 'icon':
                err_file.innerHTML = errors[key];
                break;
        }
        for(let i = 0; i < inputs_array.length; i++){
            if(key == inputs_array[i].id){
                inputs_array[i].nextElementSibling.innerHTML = errors[key];  
                break; 
            }
        }
        for(let i = 0; i < inputs_urls.length; i++){
            if(key === inputs_urls[i].id){
                inputs_urls[i].nextElementSibling.innerHTML = errors[key];  
                break; 
            }
        }   
    });
}
//! {name, link, requerimients}
const createLinks = (links) =>{
    const divLinks = document.createElement('div');
    divLinks.classList.add('links');
    let id = formLinks.children.length + 1;
    Object.keys(links).forEach( (input, i)=>{
        let html = `
        <div class="form__item">
        <input  class="form__item--input ${ (i!==2)?'link-input':'' } 
                                        ${(input==='link')? 'link-url': ''}" 
                type="text" 
                name="${input}"
                id="${input}_${id}"
                value="${links[input]}"
                placeholder="${input}">
        <small class="err_${input} danger"></small>
        </div>
        `;
        divLinks.innerHTML += html;
    });

    divLinks.querySelectorAll('.link-input').forEach(input=>{
        input.addEventListener('blur', ()=>{
            if(!isNotEmpty(input)){
                printMsgErrors();
                return;
            }
            printMsgErrors();
        });

        //* evento change
    });

    divLinks.querySelectorAll('.link-url').forEach(input=>{
        input.addEventListener('blur', ()=>{
            if(!isNotEmpty(input)){
                printMsgErrors();
                return;
            }

            if(!isNotUrl(input)){
                printMsgErrors();
                return;
            }
        })

        //* evento change
    })

    formLinks.append(divLinks);
}

let countLinks = 0;
let countEliminar = 0;

if(!params.has('id')){
    location.replace(`${location.origin}/${location.pathname.split('/')[1]}/`);
}else{
    const id = params.get('id');
    getDirectorio(id)
    .then( resp =>{
        if(!resp.resp){
            name.value = resp.name;
            desc.value = resp.desc;
            resp.links.forEach( (links) =>{
                // * probar solo enviando links y desestructurar en la funcion
                const { name, link, requerimients} = links;
                const inputLink = { name, link, requerimients};
                createLinks(inputLink);
                countLinks++;
            });
        }
    });
}

formDirectorio.addEventListener('submit', (e)=>e.preventDefault());

btnEnviar.addEventListener('click', async()=>{
    validationForm();
    printMsgErrors();
    if(Object.keys(errors).length === 0){
        const newLinks = [];
        const links = [];
        const directorio = {
            'name': name.value,
            'desc': desc.value,
            'id': params.get('id')
        };

        const linkId = await getLinksId(params.get('id'));
        let idEliminar = 1;
        if(countEliminar>0){
            console.log(countEliminar);
            for(let i = 0; i < countEliminar; i++){
                
                console.log(linkId.length - idEliminar);
                console.log(linkId[linkId.length - idEliminar].id);
                if(linkId[linkId.length - idEliminar]){
                    const resp = await deleteLinkId(linkId[linkId.length - idEliminar].id);
                }
                idEliminar++;
            } 
            countEliminar--;
        }    

        for(let i = 0; i < countLinks; i++){
            const link = {};
            for(let j= 0; j < formLinks.children[i].children.length; j++){
                link[formLinks.children[i].children[j].children[0].name] = formLinks.children[i].children[j].children[0].value;
                link['id'] = linkId[i].id;
            }
            links.push(link);
        }

        // * si file contiene algo mandamos a guardar esa imagen y lugo obtenemos el nombre
        if ( file.files[0] ){
            const fileIcon = await postIconDirectorio(file.files[0]);
            directorio['icon'] = fileIcon.icon;
        }else{ //* si no pues le dejamos vacio el campo
            directorio['icon'] = '';
        };

        directorio['links'] = links;
        const resp = await putDirectorio( directorio );
        //* respuesta de la edicion del directorio 
        console.log(resp); 

        for(let i = countLinks; i < formLinks.children.length ; i++){
            const links = {};
            for(let j= 0; j < formLinks.children[i].children.length; j++){
                links[formLinks.children[i].children[j].children[0].name] = formLinks.children[i].children[j].children[0].value;
            }
            links['id']=params.get('id');
            newLinks.push(links);
        }
        if( newLinks.length > 0){
            //* imprecion del array para crear nuevos links
            console.log(newLinks);
            //* creacion de los nuevos links
            await postLinks( newLinks );
        }

        location.replace(`${location.origin}/${location.pathname.split('/')[1]}/`);
    
    }
})

btnFile.addEventListener('click', ()=>{
    file.click();
})

file.addEventListener('change', ()=>{
    btnFile.innerText = file.files[0].name;
    validationFile();
    printMsgErrors();
});

btnAdd.addEventListener('click', ()=>{
    createLinks({name: '', link: '', requerimients: ''});
});

btnMin.addEventListener('click', async()=>{
    formLinks.removeChild(formLinks.children[formLinks.children.length -1 ]);
    countLinks--;
    countEliminar++;
});

name.addEventListener('blur', ()=>{
    validationName();
    printMsgErrors();
})

desc.addEventListener('blur', ()=>{
    validationDesc();
    printMsgErrors();
})