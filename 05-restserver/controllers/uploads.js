const { response, request } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({
      msg: "No hay archivo para subir",
    });
    return;
  }

  // Imagenes 
  //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');

  const nombre = await subirArchivo(req.files, undefined, 'imgs');

  res.json({
    nombre
  });
};

const actualizarImagen = async(req, res = response) =>{

    const {id, coleccion} = req.params;

    res.json({id, coleccion});
}

module.exports = {
  cargarArchivo,
  actualizarImagen
};
