const url = `${location.origin}/${location.pathname.split('/')[1]}/Api/controllers/directorio.php`;
const getDirectorios = async () => {
  try {
    const resp = await fetch(`${url}?op=getDirectorioLinks`).then((resp) =>
      resp.json()
    );
    return resp;
  } catch (error) {
    throw new Error(error);
  }
};

const getDirectorio = async (id) => {
  try {
    const resp = await fetch(`${url}?op=getDirectorioLink`, {
      method: "POST",
      body: JSON.stringify({ id: id }),
    }).then((resp) => resp.json());
    return resp;
  } catch (error) {
    throw new Error(error);
  }
};

const postDirectorio = async (body) => {
  try {
    const resp = await fetch(`${url}?op=postDirectorioLinks`, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
    return resp;
  } catch (error) {
    throw new Error("error en la insercion del directorio", error);
  }
};

const putDirectorio = async (body) => {
  try {
    const resp = await fetch(`${url}?op=putDirectorioLinks`, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
    return resp;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteDirectorio = async (id) => {
  try {
    const resp = await fetch(`${url}?op=deleteDirectorioLinks`, {
      method: "POST",
      body: JSON.stringify({ id: id }),
    }).then((resp) => resp.json());
    return resp;
  } catch (error) {
    throw new Error("error en la eliminacion del directorio", error);
  }
};

const postIconDirectorio = async (file) => {
  try {
    const formData = new FormData();
    formData.append("icon", file);
    const response = await fetch(`${url}?op=postFile`, {
      method: "POST",
      body: formData,
    }).then((resp) => resp.json());
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const postLinks = async (links) => {
  try {
    const resp = await fetch(`${url}?op=postLinks`, {
      method: "POST",
      body: JSON.stringify({ links }),
    }).then((resp) => resp.json());
    return resp;
  } catch (error) {
    throw new Error(error);
  }
};

const getLinksId = async ( id ) =>{
  try{
    const resp = await fetch(`${url}?op=getLinksId`,{
      method: "POST",
      body: JSON.stringify({ 'id':id })
    }).then(resp=>resp.json());
    return resp;
  }catch(error){
    throw new Error( error );
  }
}

const deleteLinkId = async( id ) =>{
  try{
    const resp = await fetch(`${url}?op=deleteLink`,{
      method: "POST",
      body: JSON.stringify({ 'id':id })
    }).then( resp => resp.json());
    return resp;
  }catch( error ){
    throw new Error( error );
  }
}

export {
  getDirectorios,
  getDirectorio,
  getLinksId,
  postLinks,
  postIconDirectorio,
  deleteDirectorio,
  putDirectorio,
  postDirectorio,
  deleteLinkId
}