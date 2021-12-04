import {
    postDirectorio,
    postIconDirectorio
} from './http-providers.js';

const formDirectorio = document.querySelector('#formDirect');
const nameDirectorio = document.querySelector('#nameDirectorio');
const descDirectorio = document.querySelector('#description');
const fileDirectorio = document.querySelector('#file');
const btnFile = document.querySelector('#btnFile');
const btnSubmit = document.querySelector('#btnEnviar');

const formLinks = document.querySelector('.form__links');
const btnAdd = document.querySelector('#btnAdd');
const btnMin = document.querySelector('#btnMin');
const nameInput = document.querySelector('#name_1');
const linkInput = document.querySelector('#link_1');

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
    console.log('es un url valdio');
    delete errors[input.id];
    return true;
}

const isNotEmptyFile = input =>{
    if(!input.files[0]){
        errors[input.name]= 'El campo icon es requerido';
        return false;
    }
    delete errors[input.name];
    return true;
}

const isValidFile = input =>{
    if(!validator.isIn(input.files[0].type, ['image/jpg', 'image/png', 'image/jpeg'])){
        errors[input.name] = 'El archivo que intenta subir no es un formato valido';
        return false;
    }
    delete errors[input.name];
    return true;
}

const validationNameInput = () =>{
    isNotEmpty(nameInput);
}

const validationLinkInput = () =>{
    if(!isNotEmpty(linkInput)) return;
    if(!isNotUrl(linkInput)) return;   
}

const validationDesc = () =>{
    isNotEmpty(descDirectorio);
}

const validationName = () =>{
    isNotEmpty(nameDirectorio);
}

const validationFile = ()=>{
    if(!isNotEmptyFile(fileDirectorio)) return;
    if(!isValidFile(fileDirectorio)) return;
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

    Object.keys(errors).forEach( (key) => {
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
            if(key === inputs_array[i].id){
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

formDirectorio.addEventListener('submit', (e)=>e.preventDefault());
btnFile.addEventListener('click', ()=>{
    fileDirectorio.click();
});

fileDirectorio.addEventListener('change', ()=>{
    validationFile();
    printMsgErrors();
    btnFile.innerHTML = fileDirectorio.files[0].name;
});

btnSubmit.addEventListener('click', async ()=>{
    validationForm();
    printMsgErrors();
    if(Object.keys(errors).length === 0){
        const links = [];
        const directorio = {
            'name': nameDirectorio.value,
            'desc': descDirectorio.value,
        };
        
        for(let i = 0; i < formLinks.children.length; i++){
            const link = {};
            for(let j = 0; j < formLinks.children[i].children.length; j++){
                link[formLinks.children[i].children[j].children[0].name] = formLinks.children[i].children[j].children[0].value;
            }
            links.push(link);
        }

        const file = await postIconDirectorio(fileDirectorio.files[0]);
        directorio['icon'] = file.icon;
        directorio['links'] = links;
        console.log(directorio);
        const resp = await postDirectorio(directorio);
        console.log(resp);
        // location.replace('http://localhost/directorio-sistemas-internos/index.html');
    }
});

btnAdd.addEventListener('click', ()=>{
    const divLinks = document.createElement('div');
    divLinks.classList.add('links');
    let id = formLinks.children.length + 1;
    ['name','link','requerimients'].forEach( (input, i)=>{
        let html = `
        <div class="form__item">
        <input  class="form__item--input ${ (i!==2)?'link-input' : ''} 
                                        ${(input==='link')? 'link-url': ''} " 
                type="text" 
                name="${input}"
                id="${input}_${id}" 
                placeholder="${input}">
        <small class="err_${input} danger"></small>
        </div>
        `;
        divLinks.innerHTML += html;
    })
    
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
});

btnMin.addEventListener('click', ()=>{
    formLinks.removeChild(formLinks.children[formLinks.children.length -1 ]);
});

nameDirectorio.addEventListener( 'blur', ()=>{
    validationName();
    printMsgErrors();
});

descDirectorio.addEventListener('blur', ()=>{
    validationDesc();
    printMsgErrors();
})

nameInput.addEventListener('blur', ()=>{
    validationNameInput();
    printMsgErrors();
});

linkInput.addEventListener('blur', ()=>{
    validationLinkInput();
    printMsgErrors();
});